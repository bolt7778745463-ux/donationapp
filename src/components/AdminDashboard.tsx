import React, { useState, useEffect } from 'react';
import { LogOut, Filter, RefreshCw, Package, Users, CheckCircle, Clock, Moon, Sun, Home, Download, Key } from 'lucide-react';
import axios from 'axios';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';

interface Donation {
  id: number;
  full_name: string;
  phone: string;
  region: string;
  district: string;
  category: string;
  status: string;
  created_at: string;
}

interface Stats {
  total: number;
  underProcess: number;
  completed: number;
}

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ token, onLogout }) => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, underProcess: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'أثاث' | 'أخرى'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [changePasswordMessage, setChangePasswordMessage] = useState('');
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [donationsRes, statsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/donations', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/donations/stats', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setDonations(donationsRes.data);
      setStats(statsRes.data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token is invalid or expired, redirect to login
        onLogout();
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await axios.put(`http://localhost:5000/api/donations/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData(); // Refresh data
    } catch (error: any) {
      console.error('Error updating status:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token is invalid or expired, redirect to login
        onLogout();
        window.location.href = '/login';
      }
    }
  };

  const filteredDonations = donations.filter(donation => {
    // Category filtering logic:
    // - If category contains 'أثاث' (even partially), classify as 'أثاث'
    // - Otherwise, classify as 'أخرى'
    const isFurniture = donation.category.includes('أثاث');
    const matchesCategory = filter === 'all' ||
      (filter === 'أثاث' && isFurniture) ||
      (filter === 'أخرى' && !isFurniture);
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  const statusOptions = ['تم الاستلام', 'تحت المعالجة', 'مكتمل'];

  const exportToExcel = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donations/export', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob' // Important for file download
      });

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'donations.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Error exporting to Excel:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token is invalid or expired, redirect to login
        onLogout();
        window.location.href = '/login';
      }
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
      setChangePasswordMessage('كلمات المرور الجديدة غير متطابقة');
      return;
    }

    if (changePasswordForm.newPassword.length < 6) {
      setChangePasswordMessage('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/change-password', {
        username: changePasswordForm.username,
        currentPassword: changePasswordForm.currentPassword,
        newPassword: changePasswordForm.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setChangePasswordMessage('تم تغيير كلمة المرور بنجاح');
      setChangePasswordForm({
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      setTimeout(() => {
        setShowChangePasswordModal(false);
        setChangePasswordMessage('');
      }, 2000);
    } catch (error: any) {
      console.error('Error changing password:', error);
      if (error.response?.status === 401) {
        setChangePasswordMessage('كلمة المرور الحالية غير صحيحة');
      } else if (error.response?.status === 404) {
        setChangePasswordMessage('المستخدم غير موجود');
      } else {
        setChangePasswordMessage('حدث خطأ أثناء تغيير كلمة المرور');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#BFAA2A] transition-colors duration-200"
              aria-label="العودة إلى الصفحة الرئيسية"
            >
              <Home className="w-5 h-5" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">لوحة التحكم</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#BFAA2A] transition-colors duration-200"
              aria-label="تبديل الوضع المظلم"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowChangePasswordModal(true)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#BFAA2A] transition-colors duration-200"
              aria-label="تغيير كلمة المرور"
            >
              <Key className="w-5 h-5" />
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">إجمالي التبرعات</h3>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <Package className="w-12 h-12 text-white opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">تحت المعالجة</h3>
                <p className="text-3xl font-bold text-white">{stats.underProcess}</p>
              </div>
              <Clock className="w-12 h-12 text-white opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">مكتمل</h3>
                <p className="text-3xl font-bold text-white">{stats.completed}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-white opacity-80" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900 dark:text-white">تصفية:</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="all">جميع الفئات</option>
                <option value="أثاث">أثاث</option>
                <option value="أخرى">أخرى</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="all">جميع الحالات</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <button
                onClick={fetchData}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                تحديث
              </button>
              <button
                onClick={exportToExcel}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                تصدير إلى Excel
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">جاري التحميل...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">الاسم</th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">الهاتف</th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">المنطقة</th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">الحي</th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">الفئة</th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">الحالة</th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">التاريخ</th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredDonations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">{donation.full_name}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{donation.phone}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{donation.region}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{donation.district}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{donation.category}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          donation.status === 'مكتمل' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          donation.status === 'تحت المعالجة' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{new Date(donation.created_at).toLocaleDateString('ar-SA')}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {donation.status !== 'مكتمل' && (
                          <select
                            value={donation.status}
                            onChange={(e) => updateStatus(donation.id, e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">تغيير كلمة المرور</h2>
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  اسم المستخدم
                </label>
                <input
                  type="text"
                  value={changePasswordForm.username}
                  onChange={(e) => setChangePasswordForm({...changePasswordForm, username: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  كلمة المرور الحالية
                </label>
                <input
                  type="password"
                  value={changePasswordForm.currentPassword}
                  onChange={(e) => setChangePasswordForm({...changePasswordForm, currentPassword: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  كلمة المرور الجديدة
                </label>
                <input
                  type="password"
                  value={changePasswordForm.newPassword}
                  onChange={(e) => setChangePasswordForm({...changePasswordForm, newPassword: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  تأكيد كلمة المرور الجديدة
                </label>
                <input
                  type="password"
                  value={changePasswordForm.confirmPassword}
                  onChange={(e) => setChangePasswordForm({...changePasswordForm, confirmPassword: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  minLength={6}
                />
              </div>
              {changePasswordMessage && (
                <div className={`text-sm p-2 rounded ${changePasswordMessage.includes('بنجاح') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                  {changePasswordMessage}
                </div>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500"
                >
                  تغيير كلمة المرور
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors focus:ring-2 focus:ring-gray-500"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

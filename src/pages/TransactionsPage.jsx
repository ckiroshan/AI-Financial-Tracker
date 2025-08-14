import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { ArrowLeft, Search, Filter, Calendar, TrendingUp, TrendingDown, Utensils, Car, ShoppingCart, Heart, Home, Zap, Gift, Plane, CreditCard, PieChart, User, Plus, Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TransactionFormModal from '../components/TransactionFormModal'
import { transactionAPI } from '../services/api'
import { APP_CONFIG } from '../config/api'

// Mock data for categories (you'll need to fetch this from your backend)
const categories = [
  { _id: '1', name: 'Food & Dining', icon: Utensils, color: 'bg-orange-500' },
  { _id: '2', name: 'Transportation', icon: Car, color: 'bg-blue-500' },
  { _id: '3', name: 'Shopping', icon: ShoppingCart, color: 'bg-pink-500' },
  { _id: '4', name: 'Health', icon: Heart, color: 'bg-red-500' },
  { _id: '5', name: 'Bills', icon: Zap, color: 'bg-yellow-500' },
  { _id: '6', name: 'Travel', icon: Plane, color: 'bg-cyan-500' },
  { _id: '7', name: 'Gifts', icon: Gift, color: 'bg-rose-500' },
  { _id: '8', name: 'Salary', icon: TrendingUp, color: 'bg-green-500' },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingTransaction, setEditingTransaction] = useState(null)

  // Fetch transactions from backend
  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await transactionAPI.getTransactions()
      setTransactions(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch transactions')
      console.error('Error fetching transactions:', err)
    } finally {
      setLoading(false)
    }
  }

  // Create new transaction
  const handleCreateTransaction = async (transactionData) => {
    try {
      const response = await transactionAPI.createTransaction({
        type: transactionData.type,
        amount: parseFloat(transactionData.amount),
        note: transactionData.description,
        date: transactionData.date,
        source: transactionData.account,
        user_id: APP_CONFIG.DEFAULT_USER_ID, // Replace with actual user ID
        category_id: transactionData.category_id || '1', // Replace with actual category ID
      })

      setTransactions(prev => [response.data, ...prev])
      setIsModalOpen(false)
    } catch (err) {
      setError('Failed to create transaction')
      console.error('Error creating transaction:', err)
    }
  }

  // Update transaction
  const handleUpdateTransaction = async (transactionData) => {
    try {
      const response = await transactionAPI.updateTransaction(editingTransaction._id, {
        type: transactionData.type,
        amount: parseFloat(transactionData.amount),
        note: transactionData.description,
        date: transactionData.date,
        source: transactionData.account,
        category_id: transactionData.category_id || '1',
      })

      setTransactions(prev => 
        prev.map(t => t._id === editingTransaction._id ? response.data : t)
      )
      setEditingTransaction(null)
      setIsModalOpen(false)
    } catch (err) {
      setError('Failed to update transaction')
      console.error('Error updating transaction:', err)
    }
  }

  // Delete transaction
  const handleDeleteTransaction = async (transactionId) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return
    }

    try {
      await transactionAPI.deleteTransaction(transactionId)
      setTransactions(prev => prev.filter(t => t._id !== transactionId))
    } catch (err) {
      setError('Failed to delete transaction')
      console.error('Error deleting transaction:', err)
    }
  }

  // Edit transaction
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = formatDate(transaction.date)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(transaction)
    return groups
  }, {})

  // Filter transactions based on active tab
  const filteredTransactions = Object.entries(groupedTransactions).map(([date, transactions]) => ({
    date,
    transactions: transactions.filter(t => 
      activeTab === 'all' || 
      (activeTab === 'income' && t.type === 'income') ||
      (activeTab === 'expense' && t.type === 'expense')
    )
  })).filter(group => group.transactions.length > 0)

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  useEffect(() => {
    fetchTransactions()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Transactions</h1>
          <Button variant="ghost" size="sm" className="p-2">
            <Filter className="w-6 h-6" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 rounded-xl"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-6 py-2">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium">Income</p>
                  <p className="text-lg font-bold text-green-700">{APP_CONFIG.CURRENCY} {totalIncome.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-red-600 font-medium">Expense</p>
                  <p className="text-lg font-bold text-red-700">{APP_CONFIG.CURRENCY} {totalExpense.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="income" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Income
            </TabsTrigger>
            <TabsTrigger value="expense" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Expense
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Transactions List */}
      <div className="px-6 space-y-6">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No transactions found</p>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-green-500 hover:bg-green-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        ) : (
          filteredTransactions.map((group) => (
            <div key={group.date}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">{group.date}</h3>
                <div className="text-sm text-gray-500">
                  {group.transactions.length} transaction{group.transactions.length !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="space-y-2">
                {group.transactions.map((transaction) => {
                  const category = categories.find(c => c._id === transaction.category_id) || categories[0]
                  const Icon = category.icon
                  const color = category.color
                  
                  return (
                    <Card key={transaction._id} className="shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{transaction.note}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-gray-500">{category.name}</span>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-500">
                                {new Date(transaction.date).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-500">{transaction.source}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                                                         <div className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                               {transaction.type === 'income' ? '+' : '-'}{APP_CONFIG.CURRENCY} {transaction.amount.toLocaleString()}
                             </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditTransaction(transaction)}
                                className="p-1 h-8 w-8"
                              >
                                <Edit className="w-4 h-4 text-gray-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteTransaction(transaction._id)}
                                className="p-1 h-8 w-8 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-6 w-14 h-14 rounded-full shadow-lg bg-green-500 hover:bg-green-600"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Transaction Form Modal */}
      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTransaction(null)
        }}
        onSave={editingTransaction ? handleUpdateTransaction : handleCreateTransaction}
        editingTransaction={editingTransaction}
        categories={categories}
      />

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-3">
          <Link to="/dashboard" className="flex flex-col items-center p-2">
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Home</span>
          </Link>
          <Link to="/transactions" className="flex flex-col items-center p-2">
            <CreditCard className="w-6 h-6 text-green-500" />
            <span className="text-xs text-green-500 mt-1 font-medium">Transactions</span>
          </Link>
          <Link to="/budget" className="flex flex-col items-center p-2">
            <PieChart className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Budget</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-2">
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

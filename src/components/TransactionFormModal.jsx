import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { X, Plus, Minus, Calendar, FileText } from 'lucide-react'

const accounts = [
  { name: 'Cash', icon: '💵' },
  { name: 'Card', icon: '💳' },
  { name: 'Bank', icon: '🏦' },
]

export default function TransactionFormModal({ isOpen, onClose, onSave, editingTransaction, categories = [] }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category_id: '',
    account: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' // 'expense' or 'income'
  })

  // Reset form when modal opens/closes or when editing transaction changes
  useEffect(() => {
    if (isOpen) {
      if (editingTransaction) {
        // Populate form with editing transaction data
        setFormData({
          description: editingTransaction.note,
          amount: editingTransaction.amount.toString(),
          category_id: editingTransaction.category_id,
          account: editingTransaction.source,
          date: new Date(editingTransaction.date).toISOString().split('T')[0],
          type: editingTransaction.type
        })
      } else {
        // Reset form for new transaction
        setFormData({
          description: '',
          amount: '',
          category_id: '',
          account: '',
          date: new Date().toISOString().split('T')[0],
          type: 'expense'
        })
      }
    }
  }, [isOpen, editingTransaction])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.description || !formData.amount || !formData.category_id || !formData.account) {
      alert('Please fill in all required fields')
      return
    }

    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">
            {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Transaction Type */}
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={formData.type === 'expense' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setFormData({ ...formData, type: 'expense' })}
              >
                <Minus className="w-4 h-4 mr-2" />
                Expense
              </Button>
              <Button
                type="button"
                variant={formData.type === 'income' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setFormData({ ...formData, type: 'income' })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Income
              </Button>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="pl-12"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category *</label>
              <div className="grid grid-cols-4 gap-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category._id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category_id: category._id })}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        formData.category_id === category._id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-center mb-1">
                        <Icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="text-xs text-gray-600">{category.name}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Account */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Account *</label>
              <div className="grid grid-cols-3 gap-2">
                {accounts.map((account) => (
                  <button
                    key={account.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, account: account.name })}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      formData.account === account.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xl mb-1">{account.icon}</div>
                    <div className="text-xs text-gray-600">{account.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {editingTransaction ? 'Update Transaction' : 'Save Transaction'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

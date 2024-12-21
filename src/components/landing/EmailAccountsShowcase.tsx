import React from 'react';
import { Mail, Send, Percent, MoreVertical } from 'lucide-react';

const EmailAccountsShowcase = () => {
  return (
    <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Email Account</h3>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
                  + Add Email
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">TOTAL EMAIL SENT</div>
                    <div className="text-2xl font-bold text-gray-900">10065</div>
                  </div>
                </div>
              </div>

              {['m@coldemaily.com', 'm@positivreplieslabs.com'].map((email, index) => (
                <div key={email} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-900 font-medium">{email}</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: index === 0 ? '86%' : '92%' }}
                    ></div>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600">{index === 0 ? '6523' : '4562'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">{index === 0 ? '4029' : '3260'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-600">{index === 0 ? '86%' : '92%'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Scale Outreach with{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Unlimited Email Accounts
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect and manage multiple email accounts to scale your outreach efforts. 
            Monitor performance, track deliverability, and optimize your campaigns all in one place.
          </p>
          <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-lg font-medium">
            START FOR FREE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailAccountsShowcase;
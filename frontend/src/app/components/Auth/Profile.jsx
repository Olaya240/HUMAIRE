import React from 'react';
import { Button } from '../ui/button';
import { useAuth } from '../../../contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { User, Mail, Shield, LogOut } from 'lucide-react';

export function Profile({ onClose }) {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md gap-0 p-0 overflow-hidden border-0 shadow-2xl">
        {/* Header Background */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 h-24 relative">
          <DialogHeader className="p-6 pb-0 relative z-10">
            <DialogTitle className="text-white">Profile</DialogTitle>
            <DialogDescription className="text-blue-100">
              Manage your account information
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6 -mt-10 relative z-20">
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg mb-4">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-2xl font-bold text-blue-600">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Name & Email */}
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-6">{user.email}</p>

            {/* Details List */}
            <div className="w-full space-y-3 bg-gray-50/50 rounded-xl p-4 border border-gray-100 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="font-medium text-gray-900 capitalize">{user.role}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={onClose} className="w-full">
                Close
              </Button>
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white gap-2"
                onClick={() => { logout(); onClose && onClose(); }}
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Profile;

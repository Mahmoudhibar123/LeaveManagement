class UserSerializer < ActiveModel::Serializer
  attributes :email, :password, :fullname, :leave_period, :address, :role
end

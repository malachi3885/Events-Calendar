class EventSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :date, :color
end

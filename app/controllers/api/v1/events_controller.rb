module Api
    module V1
        class EventsController < ApplicationController
          protect_from_forgery with: :null_session
          def index
            events = Event.order('date').all
            
            render json: EventSerializer.new(events).serialized_json
          end

          def show 
            event = Event.find(params[:id])

            render json: EventSerializer.new(event).serialized_json
          end

          def create
            event = Event.new(event_params)

            if event.save
                render json: EventSerializer.new(event).serialized_json
            else
                render json: { error: event.errors.messages }, status: 422
            end
         end

          def update
            event = Event.find(params[:id])

            if event.update(event_params)
                render json: EventSerializer.new(event).serialized_json
            else
                render json: { error: event.errors.messages }, status: 422
            end
          end

          def destroy
            event = Event.find(params[:id])

            if event.destroy
               render json: { message: "Event was successfully destroyed."}, status: 201
            else
                render json: { error: event.errors.messages }, status: 422
            end
          end
        
          private

          def event_params
            params.require(:event).permit(:title, :date, :description, :color)
          end

        end
    end
end
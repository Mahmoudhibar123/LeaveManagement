class V1::LeavesController < ApplicationController
    def index
        @leaves = Leave.all

        render json: @leaves
    end
end

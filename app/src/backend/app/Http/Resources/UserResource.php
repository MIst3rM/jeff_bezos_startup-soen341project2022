<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        Log::debug("the firstname is: " . $this->firstname);
        return [
            'id' => $this->id,
            'name' => $this->firstname,
        ];
    }
}
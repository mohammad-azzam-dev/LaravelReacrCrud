<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'waybill' => 'required|integer|unique:orders,waybill,'.$this->order?->id,
            'customer_address' => 'required|string',
            'customer_name' => 'required|string'
        ];
    }
}

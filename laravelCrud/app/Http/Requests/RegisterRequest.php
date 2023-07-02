<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|unique:users,email',
            'name' => 'required|string',
            'password' => 'required|min:8|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'email.required' =>  'the email field is required',

            'name.required' =>  'the name field is required',
            'name.string' =>  'the name field must be consist of characters',

            'password.required' =>  'the password field is required',
            'password.min' =>  'the password field must have a minimum of eight characters',
            'password.confirmed' =>  'password confirmation mismatch',
        ];
    }
}

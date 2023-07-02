<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::query()->create($data);
        if (!$user) {
            return $this->response(message: 'The was not created successfully!', status: 500);
        }
        $token = $user->generateToken();

        return $this->response('the user was created successfully', [
            'user' => $user,
            'token' => $token
        ]);


    }

    public function login(Request $request)
    {
        //never ever over engineer the logic :p
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (!Auth::attempt($credentials)) {
            return $this->response('Wrong email or password!', status: 500);
        }
        $user = Auth::user();
        $token = $user->generateToken();
        return $this->response(
            message: 'User logged in successfully',
            data: [
                'user' => $user,
                'token' => $token,
            ]);
    }

    public function logout(Request $request)
    {
        $user = auth('sanctum')->user();
        $user?->currentAccessToken()?->delete();
        return $this->response('logged out successfully');
    }

    public function getAuthUser()
    {
        return $this->response(data: [
            'user' => Auth::user()
        ]);
    }


}

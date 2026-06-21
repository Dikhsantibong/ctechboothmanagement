<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;

class TenantStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'business_name' => ['required', 'string', 'max:255'],
            'owner_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:tenants,email'],
            'phone' => ['required', 'string', 'max:20'],
            'city' => ['required', 'string', 'max:100'],
            'address' => ['nullable', 'string', 'max:500'],
            'status' => ['required', 'in:active,inactive,suspended,trial'],
            'trial_ends_at' => ['nullable', 'date', 'after:now'],
            'logo' => ['nullable', 'string', 'max:500'],
            'slug' => ['required', 'string', 'max:255', 'unique:tenants,slug'],
            'settings' => ['nullable', 'array'],
            'subscription_plan_id' => ['required', 'exists:subscription_plans,id'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'business_name.required' => 'Nama usaha wajib diisi.',
            'business_name.max' => 'Nama usaha maksimal 255 karakter.',
            'owner_name.required' => 'Nama pemilik wajib diisi.',
            'owner_name.max' => 'Nama pemilik maksimal 255 karakter.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah digunakan.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'phone.max' => 'Nomor telepon maksimal 20 karakter.',
            'city.required' => 'Kota wajib diisi.',
            'city.max' => 'Nama kota maksimal 100 karakter.',
            'status.required' => 'Status wajib diisi.',
            'status.in' => 'Status tidak valid.',
            'slug.required' => 'Slug wajib diisi.',
            'slug.unique' => 'Slug sudah digunakan.',
            'subscription_plan_id.required' => 'Paket langganan wajib dipilih.',
            'subscription_plan_id.exists' => 'Paket langganan tidak valid.',
        ];
    }
}

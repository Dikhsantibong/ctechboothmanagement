<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;

class SubscriptionPlanStoreRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:subscription_plans,slug'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'string', 'max:3'],
            'duration_days' => ['required', 'integer', 'min:1'],
            'billing_cycle' => ['required', 'in:monthly,yearly,custom'],
            'is_active' => ['boolean'],
            'is_trial' => ['boolean'],
            'trial_days' => ['nullable', 'integer', 'min:1'],
            'max_booths' => ['required', 'integer', 'min:1'],
            'max_users' => ['required', 'integer', 'min:1'],
            'storage_limit_mb' => ['required', 'integer', 'min:0'],
            'metadata' => ['nullable', 'array'],
            'features' => ['nullable', 'array'],
            'features.*.feature_name' => ['required', 'string', 'max:255'],
            'features.*.feature_key' => ['required', 'string', 'max:255'],
            'features.*.description' => ['nullable', 'string'],
            'features.*.limit' => ['nullable', 'integer', 'min:0'],
            'features.*.is_enabled' => ['boolean'],
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
            'name.required' => 'Nama paket wajib diisi.',
            'name.max' => 'Nama paket maksimal 255 karakter.',
            'slug.required' => 'Slug wajib diisi.',
            'slug.unique' => 'Slug sudah digunakan.',
            'price.required' => 'Harga wajib diisi.',
            'price.numeric' => 'Harga harus berupa angka.',
            'price.min' => 'Harga tidak boleh negatif.',
            'currency.required' => 'Mata uang wajib diisi.',
            'duration_days.required' => 'Durasi wajib diisi.',
            'duration_days.min' => 'Durasi minimal 1 hari.',
            'billing_cycle.required' => 'Siklus billing wajib diisi.',
            'billing_cycle.in' => 'Siklus billing tidak valid.',
            'max_booths.required' => 'Maksimal booth wajib diisi.',
            'max_booths.min' => 'Maksimal booth minimal 1.',
            'max_users.required' => 'Maksimal user wajib diisi.',
            'max_users.min' => 'Maksimal user minimal 1.',
            'storage_limit_mb.required' => 'Limit storage wajib diisi.',
            'storage_limit_mb.min' => 'Limit storage tidak boleh negatif.',
            'features.*.feature_name.required' => 'Nama fitur wajib diisi.',
            'features.*.feature_key.required' => 'Key fitur wajib diisi.',
        ];
    }
}

<?php

namespace Tests\Unit;

use App\Models\Setting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SettingTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_as_array_returns_key_value_map(): void
    {
        Setting::create(['key' => 'name', 'value' => 'Test User']);
        Setting::create(['key' => 'email', 'value' => 'test@example.com']);

        $result = Setting::getAllAsArray();

        $this->assertIsArray($result);
        $this->assertEquals('Test User', $result['name']);
        $this->assertEquals('test@example.com', $result['email']);
    }

    public function test_keys_are_unique(): void
    {
        Setting::create(['key' => 'name', 'value' => 'First']);

        $this->expectException(\Illuminate\Database\QueryException::class);
        Setting::create(['key' => 'name', 'value' => 'Duplicate']);
    }
}

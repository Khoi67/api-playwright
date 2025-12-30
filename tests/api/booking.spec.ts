import { expect, test } from '@playwright/test';
import { AUTH_PAYLOAD, BASE_URL } from '../../utils/TestData';

test.describe('Booking API Tests', () => {
    let token;

    test('1. Auth - CreateToken', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/auth`, {
            data: {
                username: AUTH_PAYLOAD.username,
                password: AUTH_PAYLOAD.password
            }
        });
        
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('token');
        token = responseBody.token;
        // console.log('Generated Token:', token);
    });

    test('2.All Booking - GetBookingIds', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/booking`);
        expect(response.status()).toBe(200);
        const bookings = await response.json();
        expect(Array.isArray(bookings)).toBe(true);
        console.log('Bookings: ', bookings);
    });
});
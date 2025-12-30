import { expect, test } from '@playwright/test';
import { AUTH_PAYLOAD, BASE_URL, NEW_BOOKING } from '../../utils/TestData';

test.describe.serial('Booking API Tests', () => {
    let token: string;
    let bookingId: number;

    test('1. Auth - CreateToken', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/auth`, {
            data: {
                username: AUTH_PAYLOAD.username,
                password: AUTH_PAYLOAD.password
            },
            headers: {
                'Content-Type': 'application/json'
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
    });

    test('4. Create Booking - CreateBooking', async ({ request }) => {
        const respone = await request.post(`${BASE_URL}/booking`, {
            data: {
                firstname: NEW_BOOKING.firstname,
                lastname: NEW_BOOKING.lastname,
                totalprice: NEW_BOOKING.totalprice,
                depositpaid: NEW_BOOKING.depositpaid,
                bookingdates: {
                    checkin: NEW_BOOKING.bookingdates.checkin,
                    checkout: NEW_BOOKING.bookingdates.checkout
                },
                additionalneeds: NEW_BOOKING.additionalneeds
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        expect(respone.status()).toBe(200);
        const bookingResponse = await respone.json();
        expect(bookingResponse).toHaveProperty('bookingid');
        expect(bookingResponse).toHaveProperty('booking');

        bookingId = bookingResponse.bookingid;
        // console.log('New Booking Created with ID:', bookingResponse.bookingid);
    });
    test('3. A Booking - GetBooking', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/booking/${bookingId}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        expect(response.status()).toBe(200);

        const booking = await response.json();
        expect(booking).toHaveProperty('firstname');
        expect(booking).toHaveProperty('lastname');
        expect(booking).toHaveProperty('totalprice');
        expect(booking).toHaveProperty('depositpaid');
        expect(booking).toHaveProperty('bookingdates');
        expect(booking).toHaveProperty('additionalneeds');
        // console.log('Booking Details:', booking);
    });

    test('5. Booking - UpdateBooking', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
            data: {
                firstname: 'Khoi',
                lastname: 'Updated',
                totalprice: 250,
                depositpaid: false,
                bookingdates: {
                    checkin: '2025-02-01',
                    checkout: '2025-02-10'
                },
                additionalneeds: 'Late Checkout'
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`,
                'Authorization': `Basic ${token}`
            }
        })
        expect(response.status()).toBe(200);

        const updatedBooking = await response.json();
        expect(updatedBooking.firstname).toBe('Khoi');
        expect(updatedBooking.lastname).toBe('Updated');
        expect(updatedBooking.totalprice).toBe(250);
        expect(updatedBooking.depositpaid).toBe(false);
        // console.log('Updated Booking Details:', updatedBooking);
    });

    test('6. Booking - PartialUpdateBooking', async ({ request }) => {
        const response = await request.patch(`${BASE_URL}/booking/${bookingId}`, {
            data: {
                firstname: 'Khoi',
                lastname: 'Partially - Updated'
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`,
                'Authorization': `Basic ${token}`
            }
        })
        expect(response.status()).toBe(200);

        const partialUpdatedBooking = await response.json();
        expect(partialUpdatedBooking.firstname).toBe('Khoi');
        expect(partialUpdatedBooking.lastname).toBe('Partially - Updated');
        // console.log('Partially Updated Booking Details:', partialUpdatedBooking);
    });

    test('7. Booking - DeleteBooking', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`,
                'Authorization': `Basic ${token}`
            }
        });

        // Tài liệu đang để sai 
        expect(response.status()).toBe(201);
    });
});
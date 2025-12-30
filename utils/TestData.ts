export const BASE_URL = 'https://restful-booker.herokuapp.com';

export const NEW_BOOKING = {
  firstname: 'John',
  lastname: 'Doe',
  totalprice: 200,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-01-01',
    checkout: '2025-01-05'
  },
  additionalneeds: 'Breakfast'
};

export const AUTH_PAYLOAD = {
  username: 'admin',
  password: 'password123'
};

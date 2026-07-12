# API Quick Reference

Base URL: `http://localhost:5000/api`

Send JWT token as:

```http
Authorization: Bearer YOUR_TOKEN
```

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

## Vehicles

- `GET /vehicles`
- `GET /vehicles?dispatchable=true`
- `GET /vehicles?status=Available`
- `POST /vehicles`
- `PUT /vehicles/:id`
- `DELETE /vehicles/:id`

## Drivers

- `GET /drivers`
- `GET /drivers?available=true`
- `POST /drivers`
- `PUT /drivers/:id`
- `DELETE /drivers/:id`

## Trips

- `GET /trips`
- `POST /trips`
- `POST /trips/:id/dispatch`
- `POST /trips/:id/complete`
- `POST /trips/:id/cancel`

## Maintenance

- `GET /maintenance`
- `POST /maintenance`
- `POST /maintenance/:id/close`

## Fuel & Expenses

- `GET /fuel-logs`
- `POST /fuel-logs`
- `GET /expenses`
- `POST /expenses`

## Analytics

- `GET /analytics/dashboard`
- `GET /analytics/vehicle-performance`

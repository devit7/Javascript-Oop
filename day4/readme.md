# Platform CTF

Platform Capture The Flag (CTF) dengan javascript dan OOP.


### Konsep-konsep OOP 

#### 1. Inheritance 

- **Participant** dan **Admin** extends/mewarisi kelas **User**


#### 2. Polymorphism

- Method `getData()` memiliki implementasi berbeda di Participant dan Admin
- Role property di-override dengan nilai spesifik untuk setiap kelas turunan

#### 3. Encapsulation 

- **Private fields**: `#password` di User, `#flag` di Challenge
- **Private methods**: `#addToLeaderboard()`, `#resultSubmision()` di Submission


## Fitur

### Manajemen User

- Registrasi dan autentikasi user
- Akses berdasarkan role (Admin/Participant)

### Sistem Challenge

- Admin dapat membuat challenge dengan flag
- Peserta dapat submit flag
- Validasi flag otomatis
- Sistem poin dan leaderboard

### Sistem Review

- Peserta dapat mereview challenge yang sudah diselesaikan
- Sistem rating (1-10)
- Validasi review (harus menyelesaikan challenge terlebih dahulu)



### Platform

```javascript
import CTFPlatform from "./oop/ctfplatform.js";
const platform = new CTFPlatform("Nama-Platform-CTF");
```

### Menambah Admin

```javascript
platform.addAdmin({
  name: "Nama Admin",
  username: "admin_user",
  email: "admin@example.com",
  password: "password",
});
```

### Registrasi Peserta

```javascript
platform.registerParticipant({
  name: "Nama Peserta",
  email: "peserta@example.com",
  username: "peserta_user",
  password: "password",
  campus: "Nama Universitas",
});
```

### Membuat Challenge (Admin)

```javascript
platform.addChallenge({
  title: "SQL Injection",
  description: "find flag in https://example.com",
  flag: "FLAG{123}",
  point: 200,
  adminId: 1,
});
```

### Submit Flag

```javascript
platform.submitChall("FLAG{123}", challId, participantId);
```

### Menambah Review

```javascript
platform.addReview({
  participantId: 1,
  challId: 1,
  title: "nice chall",
  description: "I solve this with sqlmap",
  rating: 9,
});
```

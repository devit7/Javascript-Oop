dalam folder day2 berisi mengenai apa yang saya pelajari

## Struktur Folder

```
day2/
├── readme.md
├── registerctf/
│   └── index.html
└── trafficlight/
    └── index.js
```

## Path File:

- **RegisterCTF**: `day2/registerctf/index.html`
- **TrafficLight**: `day2/trafficlight/index.js`

## RegisterCTF

studi kasus ini menerapkan dan mempelajari mengenai :

- OOP
- DOM (Document Object Model)
- form validation
- database service dengan localStorage

pada studi kasus ini melakukan registrasi dan menampilkan data registrasi pada tabel dan dapat melakukan penghapusan data

untuk penerapan oop terbagi menjadi 2 class

- Person sebagai parent class
- Participant sebagai children class

Class Person memiliki beberapa property dan setter getter

```
      class Person {
        #_name;
        #_username;
        #_email;
        #_password;

        constructor({ name, username, email, password }) {
          this.#_name = name;
          this.#_username = username;
          this.#_email = email;
          this.#_password = password;
        }

        get name() {}
        get username() {}
        get email() {}
        get password() {}
      }
```

menggunakan # untuk menandakan property private
karena property bersifat private (hanya dapat digunakan di kelas itu sendiri) maka menggunakan setter dan getter untuk mengambil nilai dari property


---

```
      class Participant extends Person {
        #campus;
        constructor({ campus, name, username, email, password }) {
          super({
            email: email,
            name: name,
            password: password,
            username: username,
          });
          this.#campus = campus;
        }

        addData() {}

        //
        static showAllData() {}

        // melakukan penghapusan data dari localStorage berdasarkan username
        static deleteData(username) {}
      }
```


---

addData -> melakukan penambahan data ke localStorage
static showAllData -> melakukan pengambilan data dari localStorage untuk bisa ditampilkan ke element HTML. menggunakan static agar method dapat dipanggil langsung tanpa membuat object agar fleksibel
static deleteData -> melakukan pengambilan data dari localStorage dan dilakukan filter pengecualian berdasarkan data username dan di set kembali pada localStorage


---

### 🖥️ DOM

DOM digunakan untuk melakukan modifikasi pada element HTML, salah satunya dengan menggunakan `document.getElementById()` untuk mendapatkan id dari element dan melakukan modifikasi seperti `innerText` atau `innerHTML`.

```
<tbody class="border" id="addedElement"></tbody>
const addedElement = document.getElementById("addedElement");
..code..
        static showAllData() {
          if (localStorage.getItem("participant")) {
            addedElement.innerHTML = "";
            const get = JSON.parse(localStorage.getItem("participant"));
            //console.log(get);
            get.map((item) => {
              addedElement.innerHTML += `<tr  >
              <td class="p-2">${item.name}</td>
              <td class="p-2">${item.email}</td>
              <td class="p-2">${item.username}</td>
              <td class="p-2">${item.campus}</td>
              <td class="p-2">
                <button onClick="deleteByUsername('${item.username}')" class="border rounded-md px-1 cursor-pointer">Delete</button>
              </td>
            </tr>
          `;
            });
          }
        }
```

pada kode di atas menunjukkan modifikasi element HTML yaitu menambahkan tag <tr> sebagai isi dari tag <tbody>

### Form Validation

form validasi digunakan untuk meminimalisir data inputan yang tidak diinginkan seperti null ataupun tidak sesuai dengan kriteria

```
        //validation form
        let inputValid = true;
        if (!inputEmail.value) {
          errorEmail.innerText = "Email is required.";
          inputValid = false;
        }
        if (!inputName.value) {
          errorName.innerText = "Name is required.";
          inputValid = false;
        }
        if (!inputUsername.value) {
          errorUsername.innerText = "Username is required.";
          inputValid = false;
        }
        if (!inputPassword.value || inputPassword.value.length < 6) {
          errorPassword.innerText = "Password must be at least 6 character.";
          inputValid = false;
        }
        if (!inputCampus.value) {
          errorCampus.innerText = "Campus is required.";
          inputValid = false;
        }

        if (!inputValid) return null;
```

pada kode diatas melakukan validasi dari value input kemudian bila ada ketidaksesuaian dengan operator maka akan mereturn error dengan menggunakan innerText pada tag <span> untuk memunculkan message error

### Local Storage

dalam website untuk menyimpan data secara local ada banyak cara salah satunya dengan localStorage

```
        addData() {
          let isValid = true;
          const allParticipant =
            JSON.parse(localStorage.getItem("participant")) ?? [];

          const emailCheck = allParticipant.filter(
            (data) => data.email == this.email
          );
          const usernameCheck = allParticipant.filter(
            (data) => data.username == this.username
          );
          if (emailCheck.length > 0) {
            errorEmail.innerText = "Email already exist.";
            isValid = false;
          }
          if (usernameCheck.length > 0) {
            errorUsername.innerText = "Username already exist.";
            isValid = false;
          }

          if (!isValid) return null;

          allParticipant.push({
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password,
            campus: this.#campus,
          });
          localStorage.setItem("participant", JSON.stringify(allParticipant));
          console.log("data added");
          Participant.showAllData();

          return true;
        }
```

localStorage memiliki sifat yaitu tidak dapat menerima data berupa object sehingga dilakukan perubahan terlebih dahulu menjadi string salah satu caranya dengan menggunakan JSON.stringify() dan JSON.parse() untuk merubah string object menjadi object yang dapat digunakan

dalam penggunaannya localStorage memiliki beberapa method :
.getItem() untuk melakukan pengambilan data berdasarkan key name local storage
.setItem() untuk melakukan pembuatan local storage dengan 2 input parameter ("keyname", data_yang_akan_disimpan)

### Traffic Light

studi kasus ini menerapkan dan mempelajari mengenai :

- OOP
- menyatukan beberapa konsep OOP menjadi satu

pada studi kasus ini melakukan penerapan alur dari lampu lalu lintas menjadi OOP pada 

Memiliki 5 class

- BaseState -> sebagai class parent memiliki 2 method untuk di override class children
- Red, Green, Orange -> sebagai class children memiliki 2 method untuk melakukan pemuatan method selanjutnya dan untuk menmapilkan warna saat ini
- TraficLight -> class tersendiri untuk melakukan penyimpanan state saat ini 



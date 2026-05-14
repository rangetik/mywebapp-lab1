````markdown
# Лабораторна робота 1

Комплексна система інвентаризації з автоматизованим розгортанням на базі **Ubuntu Server**, **Node.js**, **Nginx** та **PostgreSQL**.

**Виконав:** Жила Іван  
**Група:** ІМ-42  
**Варіант:** №11

---

## 📌 1. Варіант індивідуального завдання

Розрахунок згідно з номером у списку (N=11):
* **V2 (СУБД):** `(11 % 2) + 1 = 2` — **PostgreSQL**.
* **V3 (Тематика):** `(11 % 3) + 1 = 3` — **Inventory Service** (Сервіс обліку інвентарю).
* **V5 (Порт):** `(11 % 5) + 1 = 2` — порт **5200**.
* **V2 (Конфігурація):** Шлях `/etc/mywebapp/config.json`.

---

## 💻 2. Документація застосунку

**MyWebApp** — це RESTful сервіс на Node.js (Express), призначений для управління базою товарів (Inventory).

### Системні вимоги:
* **Node.js:** v20.x або новіше
* **npm:** v10.x або новіше
* **PostgreSQL:** v15 або новіше
* **Nginx:** v1.24 або новіше

### Конфігурація (`/etc/mywebapp/config.json`):
```json
{
  "database": {
    "host": "127.0.0.1",
    "port": 5432,
    "user": "app",
    "password": "12345678",
    "database": "mywebapp"
  },
  "server": {
    "port": 5200
  }
}
```

---

## 🔌 3. Документація API-ендпоінтів

Сервіс реалізує механізм **Content Negotiation**: формат відповіді залежить від заголовка `Accept`.

| Метод | Ендпоінт | Опис | Accept Header | Результат |
|-------|----------|------|---------------|-----------|
| GET | `/items` | Список усіх товарів | `application/json` | JSON-масив об'єктів |
| GET | `/items` | Список усіх товарів | `text/html` | HTML-таблиця |
| POST | `/items` | Створення товару | `application/json` | 201 Created |
| GET | `/items/:id` | Деталі товару по ID | `application/json` | Об'єкт товару (або 404) |

---

## 🚀 4. Документація по розгортанню (Deployment)

### Вимоги до віртуальної машини:
* **Базовий образ:** Ubuntu Server 24.04 LTS.
* **CPU:** 2 Cores | **RAM:** 2048 MB | **Disk:** 25 GB.
* **Мережа:** Bridged Adapter (Мережевий міст).

### Автоматизація:
Скрипт `setup.sh` виконує повний цикл розгортання. Для запуску:

1. Клонуйте репозиторій:
```bash
git clone https://github.com/rangetik/mywebapp-lab1.git
cd mywebapp-lab1
```

2. Надайте права на виконання та запустіть скрипт:
```bash
chmod +x setup.sh && sudo ./setup.sh
```

---

## 🧪 5. Інструкція з тестування

### 1. Перевірка Nginx та бізнес-логіки (Content Negotiation)

Перевірка виконується за допомогою `curl` з хост-машини або локально в терміналі:

**JSON формат:**
```bash
curl -i -H "Accept: application/json" http://localhost/items
```

**HTML формат (таблиця):**
```bash
curl -i -H "Accept: text/html" http://localhost/items
```

**Створення запису (POST):**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Laptop", "quantity":5}' http://localhost/items
```

### 2. Перевірка прав доступу (Users & RBAC)

* **Student & Teacher:** Мають повний доступ до `sudo`. Для `teacher` встановлено примусову зміну пароля при першому вході (`chage -d 0`).
* **Operator:** Має обмежені права. Дозволено лише керування сервісом та Nginx без запиту пароля:

```bash
su - operator
sudo systemctl status mywebapp  # Дозволено
sudo apt update                 # Буде відмовлено
```

* **App User:** Системний користувач без оболонки входу (`/usr/sbin/nologin`).

### 3. Системні перевірки та звіти

**Gradebook:** Перевірка файлу з автоматично нарахованими балами:
```bash
sudo -u student cat /home/student/gradebook
```

**Nginx Logs:** Перевірка, що проксі-сервер фіксує запити:
```bash
sudo tail -n 5 /var/log/nginx/access.log
```

**Власник процесу:** Перевірка, що застосунок запущено саме від імені користувача `app`:
```bash
ps aux | grep node
```
````

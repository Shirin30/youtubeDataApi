# youtubeDataApi

# Project Goal

An API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

# Features

The data retrieved from the database after making a GET request to our API ,paginated with 20 responses per page sorted in descending order of published datetime.

![image](https://user-images.githubusercontent.com/63365275/146654186-352db83d-d653-4247-a517-59140ead9fde.png)


Ordering by date and filtering by date and ordering by date on the filtered set is implemented.

![image](https://user-images.githubusercontent.com/63365275/146654204-a9462ed7-4043-4729-8aec-0ec055f6688b.png)


Dashboard is created using React and user can filter and order the displayed results.

![image](https://user-images.githubusercontent.com/63365275/146654272-7ec04280-27be-4e8e-b536-7a743b53aa66.png)


Pagination is implemented in both DRF and React.

![image](https://user-images.githubusercontent.com/63365275/146654310-81924975-2b9c-4037-8522-83c71602e58f.png)

Support for multiple API keys is also added so that if the limit is reached on one, it automatically shifts to the other API key.



## Installation steps

1. Ensure you have python3 installed

2. Clone the repository

3. Swich to backend folder using `cd backend`

4. Install the dependencies using `pip install -r requirements.txt`

5. Migrate existing db tables by running `python manage.py migrate`

6. Run the django development server using `python manage.py runserver`

7. Then come out of backend folder by `cd ..`

8. Go inside frontend folder by `cd frontend`

9. Install dependencies using  `npm i`

10. Run react server using `npm run start`

11. Go to http://localhost:3000/ to view the website

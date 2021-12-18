# youtubeDataApi
An API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.


The data retrieved from the database after making a GET request to our API ,paginated with 20 responses per page sorted in descending order of published datetime.

![image](https://user-images.githubusercontent.com/63365275/146654186-352db83d-d653-4247-a517-59140ead9fde.png)


Ordering by date and filtering by date and ordering by date on the filtered set is implemented.

![image](https://user-images.githubusercontent.com/63365275/146654204-a9462ed7-4043-4729-8aec-0ec055f6688b.png)


Dashboard is created using React and user can filter and order the displayed results.

![image](https://user-images.githubusercontent.com/63365275/146654272-7ec04280-27be-4e8e-b536-7a743b53aa66.png)


Pagination is implemented in both DRF and React.

![image](https://user-images.githubusercontent.com/63365275/146654310-81924975-2b9c-4037-8522-83c71602e58f.png)

Support for multiple API keys is also added so that if the limit is reached on one, it automatically shifts to the other API key.


"# Angular-Samples" 


libraries used:

@amcharts/amcharts3-angular
ng-multiselect-dropdown

___________________

Approach:

1. I have taken the data from the provided excel sheet and used the field such as Business Start Date and Neighborhood and framed the Json. 
2. Retrieved the data using the Http api call.
3. Created the multiselect dropdown using the library ng-multiselect-dropdown. Based upon the selection, the graph will be displayed below. We can select five neighborhood at a given time.
4. For displaying the chart, I have grouped the data retrieved from the Json file and updated the count of the neighborhood which appeard in the same date.
5. Finally, drawn the line graph using the count and the year.


Note:

For sample creation, I have taken some the record from the Excel sheet and framed the Json for around 500 lines. Since the number of records is very large, I have not taken the entire sheet.










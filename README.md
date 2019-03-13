The sql schema for the database can be found at “fred-fetch/db/create.sql”

###Instructions:
To run the app:
1. Unzip the attached file.
2. Navigate to 'Fred-fetch' in your terminal.
3. Type “npm install” or “yarn”
4. Type  “yarn setup” or “npm setup” (This runs the sql script)
5. Type “yarn start” or “npm start”
6. Navigate your browser to “localhost:3000” and click on the link to run.

Since this is a simple app, there’s no progress indication during the api download and SQL import.  It should take under 30 seconds. After loading the data, the app will redirect to a clickable list of the series downloaded.

###Unemployment Rates from 1980 to 2015 and SQL statement to obtain it:
`
 year |  rate
------+---------
 1980 |   7.17%
 1981 |   7.62%
 1982 |   9.71%
 1983 |   9.60%
 1984 |   7.51%
 1985 |   7.19%
 1986 |   7.00%
 1987 |   6.18%
 1988 |   5.49%
 1989 |   5.26%
 1990 |   5.62%
 1991 |   6.85%
 1992 |   7.49%
 1993 |   6.91%
 1994 |   6.10%
 1995 |   5.59%
 1996 |   5.41%
 1997 |   4.94%
 1998 |   4.50%
 1999 |   4.22%
 2000 |   3.97%
 2001 |   4.74%
 2002 |   5.78%
 2003 |   5.99%
 2004 |   5.54%
 2005 |   5.08%
 2006 |   4.61%
 2007 |   4.62%
 2008 |   5.80%
 2009 |   9.28%
 2010 |   9.61%
 2011 |   8.93%
 2012 |   8.08%
 2013 |   7.37%
 2014 |   6.17%
 2015 |   5.26%
(36 rows)`
`

```sql
SELECT DATE_PART('year', observation_date) AS YEAR, to_char(AVG(value::FLOAT),'99.99%') AS RATE FROM observations WHERE series_id = 'UNRATE' AND observation_date >= '1980-1-1' AND observation_date <= '2015-12-31' GROUP BY(DATE_PART('year', observation_date)) ORDER BY(DATE_PART('year', observation_date))
```

###Notes:
In general, given the assignment's parameters, I strived to use as close to raw SQL as possible. That said, the author of 'pg-promise' [writes](https://github.com/vitaly-t/pg-promise/wiki/Data-Imports) that import is optimized using the helpers 'column-set' and 'insert.'

That said, I did not collate all of the import SQL statements into a single transaction, as reccomended, because it would have made the code much less readable, and the overhead of multiple transactions is less important in a one-time(or a scheduled cron job.

The three FRED series ids are hardcoded into the Series model.

The "values" column in observations, despite almost always being numerical, is 'TEXT' in the schema. Some values, particularly in UNSENT, are just ".", perhaps indicating data was not been collected. I have asked for clarification from the FED via email.

The plural of series is "series", not "serieses." However, in the code it became crucial to distinguish between the plural and the singular, so there are functions with names like "importSerieses." 

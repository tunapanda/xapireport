xapireport
=============

Generate a report as a csv file for a number of users and a number of xapi queries.

Summary
-------

This utility accepts a config file in json format like this:

```
{
	"xapiEndpoint": "http://localhost/repo/learninglocker/public/data/xAPI/",
	"xapiUsername": "7b880fc1f371715ce24309b90e051fcd24d700c3",
	"xapiPassword": "c089ce76ca667862e615995b909f2ddf9acc1795",

	"columns": [{
		"verb": "http://adlnet.gov/expapi/verbs/completed",
		"object": "http://www.example.com/no.ktouch.xml#1",
		"minScore": "100",
		"maxScore": "150",
		"aggregateType": "min",
		"aggregateField": "timestamp"
	}, {
		"verb": "http://adlnet.gov/expapi/verbs/completed",
		"object": "http://www.example.com/no.ktouch.xml#1",
		"minScore": "150",
		"maxScore": "200",
		"aggregateType": "min",
		"aggregateField": "timestamp"
	}, {
		"verb": "http://adlnet.gov/expapi/verbs/attempted",
		"object": "http://www.example.com/no.ktouch.xml#1",
		"aggregateType": "count"
	}]
}
```

Based on this, it generates a csv file for import into a spreadsheet program. 
The will be one row for each user, each column is specified by the column definitions,
and each cell will contain the the information aggregated from that definition.

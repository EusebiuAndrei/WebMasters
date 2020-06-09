# Public API

## /api/accidents/chart_data

### GET

Responds with a set of labels and values for use in charts, where each pair represents a
data point or 'bucket'. Mainly meant for use with the UI on the website, but can also be
used externally.

#### Request example

`GET $HOST/api/accidents/chart_data?query=%7B%0A%20%20%22bucketType%22%3A%20%22column%22,%0A%20%20%22bucketColumn%22%3A%20%22state%22,%0A%20%20%22valueType%22%3A%20%22count%22,%0A%20%20%22joinBucketsPast%22%3A%205%0A%7D`

The `query` query parameter is a URI-encoded version of the following JSON:

```json
{
	"bucketType": "column",
	"bucketColumn": "state",
	"valueType": "count",
	"joinBucketsPast": 5
}
```

#### Response example

```json
{
	"success": true,
	"data": {
		"labels": ["CA", "TX", "FL", "SC", "NC", "other"],
		"data": [663204, 298062, 223746, 146689, 142460, 1500174]
	}
}
```

#### Request format

The request requires a `query` query parameter in the URL, a URI-encoded JSON string with
the following properties (\* = required):

-   `bucketType`\* - either 'time', for a chart where the data points represent certain
    intervals of time (see `timeChart`). or 'column', for one where they represent values
    aggregated by the value of a given column (see `bucketColumn`)
-   `bucketColumn` - required for a `bucketType` of 'column', it represents the name of a
    column with discrete values, of the following: 'source', 'tmc', 'severity', 'desc',
    'number', 'street', 'side', 'city', 'county', 'state', 'zipcode', 'timezone',
    'airportCode', 'windDirection', 'weatherCondition', 'amenity', 'bump', 'crossing',
    'giveWay', 'junction', 'noExit', 'railway', 'roundabout', 'station', 'stop',
    'trafficCalming', 'trafficSignal', 'turningLoop', 'sunriseSunsetNight',
    'civilTwilightNight', 'nauticalTwilightNight' or 'astronomicalTwilightNight'.
-   `timeChart` - required for a `bucketType` of 'time', it should be an object with some
    properties fine-tuning the time intervals: 
    - `bucketSize`\* = 'year', 'month', 'week'
    or 'day' 
    - `from` = a Date value representing the lower bound of the times to allow as
    buckets 
    - `to` = the upper bound 
    - `timeAxisBasedOn` = controls whether to define the
    time buckets by the start time of the accident ('start'), or the end time ('end')
-   `joinBucketsPast` - a positive number. If present, it signifies the number of buckets
    to show (in descending order of value) before merging the rest into a bucket labelled
    'others'.
-   `valueType*` - either 'count', which uses the number of accidents as the value of the
    bucket, or an object with the following props: - `column` - the column to calculate
    the value around - `type` - 'min', 'max' or 'avg'
-   `filters` - an array containing one or more objects with the following properties: 
    - `column` - the column to filter by 
    - `constraint` - 'in' (for a list of allowed
    values) or 'lte' (less than or equal to), 'gte' (greater than or equal to), 'lt' (less
    than), 'gt' (greater than), or 'ne' (not equal to) 
    - `value` - either an array of
    allowed values (for 'in'), or a value to compare with (for the other constraint types)

#### Response format

A JSON object with the following properties:

-   `success` - a boolean value describing the success of the query

If successful, also:

-   `labels` - array of strings, containing the names of the buckets
-   `data` - array of values corresponding to the labels above

If unsuccessful, also:

-   `message` - a message describing the reason why the query failed

Extra properties may be present in the unsuccessful case.

## /api/records/

The aim of this route is to admnistrate the website. Another purpose for this route is to
help you get any accident from database, using some filters as you want.

### GET

Aim: get all accidents/ get accidents under some filters you set.

#### Request example

`GET $HOST/api/records?query=%7B%20%20%22filters%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22column%22%3A%20%22severity%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22constraint%22%3A%20%22lte%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22value%22%3A%202%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%0A%20%20%20%20%5D%2C%0A%20%20%20%20%22orderBy%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22column%22%3A%20%22startTime%22%2C%0A%20%20%20%20%20%20%20%20%22order%22%3A%20%22desc%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22limit%22%3A%201%0A%7D`

The `query` query parameter is a URI-encoded version of the following JSON:

```json
{
    "filters": [
        {
            "column": "severity",
            "constraint": "lte",
            "value": 2
        }
    ],
    "orderBy": {
        "column": "startTime",
        "order": "desc"
    },
    "limit": 1
}
```

#### Response example

```json
{
    "success": true,
    "data": {
        "accidents": [
            {
                "_id": "5ebc1a84f33a7c7f3c29bd0e",
                "source": "MapQuest",
                "tmc": 201,
                "severity": 2,
                "startTime": "2020-01-01T00:50:55.000Z",
                "endTime": "2020-01-01T01:20:23.000Z",
                "startLat": 42.960461,
                "startLng": -73.790909,
                "distance": 0,
                "desc": "Lane blocked due to accident on US-9 at Knabner Rd.",
                "number": 2389,
                "street": "Route 9",
                "side": "L",
                "city": "Mechanicville",
                "county": "Saratoga",
                "state": "NY",
                "zipcode": "12118-3901",
                "timezone": "US/Eastern",
                "airportCode": "KALB",
                "amenity": false,
                "bump": false,
                "crossing": false,
                "giveWay": false,
                "junction": false,
                "noExit": false,
                "railway": false,
                "roundabout": false,
                "station": false,
                "stop": false,
                "trafficCalming": false,
                "trafficSignal": false,
                "turningLoop": false
            }
        ]
    }
}
```

#### Request format

`GET $HOST/api/records?query=...`

The request requires a `query` query parameter in the URL, a URI-encoded JSON string with
the following properties:

-   `filters` - an array containing one or more objects with the following properties: 
    - `column` - the column to filter by 
    - `constraint` - 'in' (for a list of allowed values) or 'lte' (less than or equal to), 
    'gte' (greater than or equal to), 'lt' (less than), 'gt' (greater than), or 'ne' (not equal to) - `value` - either an array of
    allowed values (for 'in'), or a value to compare with (for the other constraint types)
    - `value` - either an array of
        allowed values (for 'in'), or a value to compare with (for the other constraint types)

-   `orderBy` - The orderBy property store other 2 properties: `column` and `order`.
    The column to filter by should be a valid column from the database, and the order
    specifies the rule: (asc)ending, (desc)ending.

-   `skip` - the number of accidents you want to skip.

-   `limit` - the number of accidents you want. You can set a limit (max: 20). By default, 
    it is 10.

-   `columns` - the columns you want from the database. By default, all columns are selected.

#### Response format

A JSON object with the following properties:

-   `success` - a boolean value describing the success of the query

If successful, also:

-   `data` - an object containing a property `accidents`, which is an array of objects 
containing the requested columns

If unsuccessful, also:

-   `message` - a message describing the reason why the query failed

Extra properties may be present in the unsuccessful case.

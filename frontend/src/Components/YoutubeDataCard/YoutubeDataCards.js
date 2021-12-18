import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import YoutubeDataCard from './YoutubeDataCard';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

const YoutubeDataCards = () => {
    // apiURL for fetching the data stored in the database.
    const apiURL = 'http://localhost:8000/youtubesearchapi/search/'

    // fileredapiURL to retrieve the data filtered by parameters {start date, end date, ascending/descending}
    const filterapiURL = 'http://localhost:8000/youtubesearchapi/filterbydate/'

    // offset is used for defining the offset for pagination. pageCount is no. of pages and perPage is the data items displayed per page.
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(8);
    const [pageCount, setPageCount] = useState(0)

    // GET apiURL query result stored in youtubedatacards state
    const [youtubedatacards, setYoutubedatacards] = useState([]);

    // GET fileredapiURL query result stored in filtereddata state
    const [filtereddata, setFiltereddata] = useState();

    // start date, end date and order (ascending/descending) for query parameters
    const [startdate, setstartdate] = useState();
    const [enddate, setenddate] = useState();
    const [order, setOrder] = useState();
    
    // getData() function to retrieve data from apiURL and store in the youtubedatacards sliced by offset.
    const getData = async () => {
        const params = { order: order }
        axios.get(apiURL, { params })
            .then(res => {
                console.log(res.data.results)
                const data = res.data.results
                const slice = data.slice(offset, offset + perPage)
                const postData = slice

                setYoutubedatacards(postData)
                setPageCount(Math.ceil(data.length / perPage))
            });
    }

    // handlePageClick() function called whenever we click on another page in page navigation.
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage)
    };

    // useEffect is used to call getData() function whenever the value of offset and order changes.
    useEffect(() => {
        getData()
    }, [offset,order])

    // useEffect to retrieve filtered data by making API request whenever startdate, enddate, offset or order changes.
    useEffect(() => {
        if (startdate && enddate) {
            const params = { startdate: startdate, enddate: enddate, order: order }
            axios.get(filterapiURL, { params }).then(res => {
                console.log(res.status)
                console.log(res.data.results)
                const data = res.data.results
                const slice = data.slice(offset, offset + perPage)
                const postData = slice

                setFiltereddata(postData)
                setPageCount(Math.ceil(data.length / perPage))
            }).catch(function (error) {
                // handle error
                console.log(error);
            });
        }

    }, [startdate, enddate, offset,order]);

    // here all the unique publishing dates are stored in a list so that we can filter data using a range of publishing dates
    var publishingdates = []
    if (youtubedatacards.length != 0) {
        for (var i = 0; i < youtubedatacards.length; i++) {
            var x = youtubedatacards[i].publishedAt
            if (!publishingdates.includes(x.substring(0, 10))) {
                publishingdates.push(x.substring(0, 10))
            }

        }
    }
// next we display our data as paginated response by using jsx and react components
    return (
        <>
            <div style={{display:'inline-block',margin:'50px'}}> 
                <Dropdown    
                    color="primary"
                    label="Start Date"
                    onClick={function () { console.log('toggle clicked') }}
                    onSelect={function (val) { setstartdate(val); }}
                >
                    {!!publishingdates && publishingdates.map(date => (
                        <DropdownItem value={date}>{date}</DropdownItem>

                    ))}
                </Dropdown>
                <p style={{color:'white',display:'inline-block',margin:'20px'}}>
                    {startdate}
                </p>
            </div>
            <div style={{display:'inline-block',margin:'50px'}} >
                <Dropdown
                    color="primary"
                    label="End Date"
                    onClick={function () { console.log('toggle clicked') }}
                    onSelect={function (val) { setenddate(val); }}
                >
                    {!!publishingdates && publishingdates.map(date => (
                        <DropdownItem value={date}>{date}</DropdownItem>

                    ))}
                </Dropdown>
                <p style={{color:'white',display:'inline-block',margin:'20px'}}>
                    {enddate}
                </p>
            </div>
            <div style={{display:'inline-block',margin:'50px'}} >
                <Dropdown
                    color="primary"
                    label="Order By"
                    onClick={function () { console.log('toggle clicked') }}
                    onSelect={function (val) { setOrder(val); }}
                >
                    <DropdownItem value="ascending">ascending</DropdownItem>
                    <DropdownItem value="descending">descending</DropdownItem>
                </Dropdown>
                <p style={{color:'white',display:'inline-block',margin:'20px'}}>
                    {order}
                </p>
            </div>
            {!startdate && !enddate ? (
                <>
                    {!!youtubedatacards ? (
                        <div>
                            <Grid container spacing={24} style={{ padding: 24 }}>
                                {youtubedatacards.map(youtubedatacard => (
                                    <Grid item xs={11} sm={5} lg={3} xl={2}>
                                        <YoutubeDataCard youtubedatacard={youtubedatacard} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    ) : "No Data found"}

                </>) : (
                <>
                    {!!filtereddata ? (
                        <div>
                            <Grid container spacing={24} style={{ padding: 24 }}>
                                {filtereddata.map(youtubedatacard => (
                                    <Grid item xs={11} sm={5} lg={3} xl={2}>
                                        <YoutubeDataCard youtubedatacard={youtubedatacard} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    ) : "No Data found"}
                </>)}
            <Grid container style={{ padding: 24 }}>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    subContainerClassName={"pages pagination"} />
            </Grid>
        </>
    );
}

export default YoutubeDataCards;

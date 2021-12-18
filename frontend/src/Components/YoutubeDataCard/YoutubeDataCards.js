import React, { Component, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import YoutubeDataCard from './YoutubeDataCard';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
const YoutubeDataCards = () => {
    const apiURL = 'http://localhost:8000/youtubesearchapi/search/'
    const filterapiURL = 'http://localhost:8000/youtubesearchapi/filterbydate/'
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(8);
    const [pageCount, setPageCount] = useState(0)
    const [youtubedatacards, setYoutubedatacards] = useState([]);
    const [startdate, setstartdate] = useState();
    const [enddate, setenddate] = useState();
    const [order, setOrder] = useState();
    const [filtereddata, setFiltereddata] = useState();


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
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage)
    };
    useEffect(() => {
        getData()
    }, [offset,order])

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

    var publishingdates = []
    if (youtubedatacards.length != 0) {
        for (var i = 0; i < youtubedatacards.length; i++) {
            var x = youtubedatacards[i].publishedAt
            if (!publishingdates.includes(x.substring(0, 10))) {
                publishingdates.push(x.substring(0, 10))
            }

        }
    }

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

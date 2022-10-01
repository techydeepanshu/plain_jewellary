import React, { useEffect, useState } from 'react'
import ReactPDF,{ Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import Sidebar from '../Sidebar'
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from "@david.kucsai/react-pdf-table"
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const styles = StyleSheet.create({
    page: {
        padding: "20px"
    },
    table: {
        width: '100%',
        paddingBottom: "30px"
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        // borderTop: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
    },
    header: {
        borderTop: 'none',
    },
    bold: {
        fontWeight: "300",
        fontSize: "10px"
    },
    // So Declarative and unDRY 👌
    row1: {
        width: '27%',
    },
    row2: {
        width: '15%',
    },
    row3: {
        width: '15%',
    },
    row4: {
        width: '20%',
    },
    row5: {
        width: '27%',
    },
    productTableHeading: {
        padding: "10px",
        fontSize: "9px",
        fontWeight: "900",
        backgroundColor: "grey",
        color: "white"
    },
    productTableText: {
        padding: "10px",
        fontSize: "8px"
    },
})


// Create Document Component


function PDF_Creation() {
  
    const [showInvoice, setShowInvoice] = useState(false)
    const [customer_info, setCustomer_info] = useState(
        {
            "title": "wait..",
            "client_id": "XXXXXXX",
            "first_name": "wait..",
            "surname": "wait..",
            "house_name": "wait..",
            "address_l2": "",
            "city_and_town": "wait..",
            "postcode": "wait..",
            "telephone": "wait..",
            "mobile": "+wait..",
            "email": "wait..",
            "relation_OD": "",
            "name_OD": "",
            "surname_OD": "",
            "comments_OD": "",
            "email_OD": "",
            "mobile_OD": "",
            "consent": true
        }
    )
    const [products_info, setProducts_info] = useState([
        {
            "item_id": 4,
            "item": "wait..",
            "TodayDate": "01/10/2022",
            "dropdown": [
                "RING",
                "PENDANT",
                "S CHAIN",
                "H CHAIN ",
                "BRACELET",
                "NECKLACE",
                "EARSTUD",
                "EARRINGS",
                "EARDROPS",
                "BANGLES L",
                "BANGLES C",
                "PONCHA",
                "SET",
                "H SET",
                "P SET",
                "TWIN SET",
                "BRANDS",
                "ANKLETS",
                "ETERNITY",
                "HALF ETERNITY"
            ],
            "product_sub_cat_dropdown": [
                "PLAIN",
                "STONE SET"
            ],
            "supplier_dropdown": [
                "THC",
                "CTS",
                "BAB",
                "DLP",
                "JJ",
                "MJ",
                "OG",
                "PCOG",
                "SUS",
                "GETA",
                "LDSK",
                "LDSK",
                "LDSK",
                "LDSK",
                "LDSK",
                "MB",
                "NLL",
                "NLL",
                "SJ",
                "SJ",
                "SJ",
                "SJ",
                "SJ",
                "AM",
                "SRK",
                "SJ",
                "zes"
            ],
            "Wt_est": 49.13,
            "product_ref": "9375001",
            "price": 121.8813,
            "product_size_dropdown": [
                "F",
                "F+",
                "G",
                "G+",
                "H",
                "H+",
                "I",
                "I+",
                "J",
                "J+",
                "K",
                "K+",
                "L",
                "L+",
                "M",
                "M+",
                "N",
                "N+",
                "O",
                "O+",
                "P",
                "P+",
                "Q",
                "Q+",
                "R",
                "R+",
                "S",
                "S+",
                "T",
                "T+",
                "U",
                "U+",
                "V",
                "V+",
                "W",
                "W+",
                "X",
                "X+",
                "Y",
                "Y+",
                "Z",
                "Z+",
                "Z1",
                "Z1+",
                "Z2",
                "Z2+",
                "Z3",
                "z3+"
            ],
            "item_type_selected": "wait..",
            "product_sub_cat_selected": "wait..",
            "supplier_selected": "wait..",
            "product_size_selected": "wait..",
            "metal_selected": "wait..",
            "notes_selected": ""
        },

    ])
    const location = useLocation();
    const navigate = useNavigate();
    // useEffect(() => {
    // setCustomer_info(location.state.customer_info)
    // setProducts_info(location.state.products)
    // }, []);

    // let customer_info = location.state.customer_info
    // let products_info = location.state.products

    console.log("loc : ", location)

    const MyDocument = () => (

        <Document>
            <Page size="A4" style={styles.page}>

                <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", paddingBottom: "30px" }}>
                    <Text>INVOICE</Text>
                    <Text>Muljis</Text>
                </View>

                <View style={styles.table}>

                    <View style={[styles.bold, styles.row]} wrap={false}>
                        <Text style={styles.row1}>{customer_info.first_name}</Text>
                        <Text style={styles.row1}>Order Number: 234232</Text>
                        <Text style={styles.row1}>Order Date: 22/12/2022</Text>
                    </View>


                </View>

                <Table
                    data={products_info}
                >
                    <TableHeader>
                        <TableCell style={styles.productTableHeading} >ITEM</TableCell>
                        <TableCell style={styles.productTableHeading} >ITEM TYPE</TableCell>
                        <TableCell style={styles.productTableHeading} >PRODUCT SUB CAT.</TableCell>
                        <TableCell style={styles.productTableHeading} >WT EST</TableCell>
                        <TableCell style={styles.productTableHeading} >REF SU</TableCell>
                        <TableCell style={styles.productTableHeading} >SIZE</TableCell>
                        <TableCell style={styles.productTableHeading} >METAL</TableCell>
                        <TableCell style={styles.productTableHeading} >PRICE</TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.item} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.item_type_selected} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.product_sub_cat_selected} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.Wt_est} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.supplier_selected} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.product_size_selected} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.metal_selected} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.price} />

                    </TableBody>
                </Table>
            </Page>
        </Document>
    );
    return (
        <>
            <Sidebar />

            {showInvoice ? <PDFViewer style={{ height: "80vh", width: "78vw" }}>

                <MyDocument/>

            </PDFViewer> : null}

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "25px"
            }}>
                <Button variant="contained"

                    onClick={() => {
                        // console.log("button : ", formData)
                        //    navigate.goback()
                        navigate(-1)
                    }}
                >Go Back</Button>
                <Button variant="contained"

                    onClick={() => {
                        // console.log("button : ", formData)
                        //    navigate.goback()
                        // navigate(-1)
                        setCustomer_info(location.state.customer_info)
                        setProducts_info(location.state.products)
                        setShowInvoice(true)
                    }}
                >Preview Invoice</Button>
                
            </div>
        </>
    )
}

export default PDF_Creation
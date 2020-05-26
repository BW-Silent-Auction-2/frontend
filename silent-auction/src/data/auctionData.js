
// just dummy data to get a list on the home page until I had an end point. 
export const Auction = {
    id: 1,
    images: ["https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fantiquefurnituredirect.co.uk%2Fwp-content%2Fuploads%2F2016%2F08%2FP1012313-768x1024.jpg&f=1&nofb=1"],
    sellerId: 1, // the id of the seller
    title: "Coal Scuttle",
    description: "A magnificent antique Edwardian Arts and Crafts coal scuttle in pressed brass. Dating from circa 1900.",
    currentBid: 10,
    duration: "2 days",
    reserve: 100,// min price the seller will take for the item
    bidHistory: [] // array of objects holding all the bidder id's and what they bid for this item
}

export default Auction

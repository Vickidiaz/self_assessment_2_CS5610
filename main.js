function MainModule(listingsID = "#listings") {
  const me = {};

  const listingsElement = document.querySelector(listingsID);
//  This is the chnages I made for self assessment
// notes to remember what I did: created card text class where I can add in/ bring in the data from json file
function getListingCode(listing) {
  return `<div class="col-4">
    <div class="listing card">
      <img
        src="${listing.picture_url}"
        class="card-img-top"
        alt="AirBNB Listing"
      />
      // card body class: this is where I all elemnts will be addded. More specifically, in teh card-text part
      <div class="card-body">
        <h2 class="card-title">${listing.name}</h2>
        <p class="card-text"><strong>Description: </strong>${listing.description}</p>
        <p class="card-text"><strong>Amenities: </strong>${listing.amenities}</p>
        <p class="card-text"><strong>Host: </strong>${listing.host_name}</p>
        <img
          src="${listing.host_picture_url}"
          alt="${listing.host_name}'s Profile Picture"
          class="host-picture"
        />
        <p class="card-text"><strong>Price: </strong>${listing.price}</p>
        <a href="${listing.listing_url}" class="btn btn-primary">View Listing</a>
        <!-- Like button added here, but need function still to keep like held and save the like -->
        <!-- added unique component -->
        <button class="btn btn-primary like-button">Like</button>
      </div>
    </div>
  </div>`;
}


  function redraw(listings) {
    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    try {
      const res = await fetch("airbnb_sf_listings_500.json");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const listings = await res.json();
      me.redraw(listings.slice(0, 50));
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();

main.loadData();


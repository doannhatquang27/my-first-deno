interface IPlace {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  creator: string;
}

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 w 34th St, New York, NY 10001",
    creator: "u1",
  },
];

const getAllPlaces = ({ response }: { response: any }) => {
  response.body = JSON.stringify(DUMMY_PLACES, null, 2);
};

const getPlaceById = (
  { params, response }: { params: { pid: string }; response: any },
) => {
  const placeId = params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (place) {
    response.status = 200;
    response.body = JSON.stringify(place, null, 2);
  } else {
    response.status = 404;
    response.body = { message: "Place not found" };
  }
};

const getPlacesbyUserId = (
  { params, response }: { params: { uid: string }; response: any },
) => {
  const userId = params.uid;
  const places = DUMMY_PLACES.filter(p => p.creator === userId);

  if (places && places.length > 0) {
    response.status = 200;
    response.body = JSON.stringify(places, null, 2);
  } else {
    response.status = 404;
    response.body = { message: "Place not found" };
  }
};

const createPlace = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  const createdPlace: IPlace = await body.value;

  DUMMY_PLACES.push(createdPlace);

  response.status = 200;
  response.body = { place: createdPlace };
};

const updatePlace = async (
  { params, request, response }: {
    params: { pid: string };
    request: any;
    response: any;
  },
) => {
  let updatedPlace = DUMMY_PLACES.find((p) => p.id === params.pid);
  if (updatedPlace) {
    const body = await request.body();
    const updateInfos: { title?: string; description?: string } = await body
      .value;
    updatedPlace = { ...updatedPlace, ...updateInfos };
    DUMMY_PLACES = [
      ...DUMMY_PLACES.filter((p) => p.id !== params.pid),
      updatedPlace,
    ];
    response.status = 200;
    response.body = JSON.stringify(updatedPlace, null, 2);
  } else {
    response.status = 404;
    response.body = { message: "Place not found" };
  }
};

const deletePlace = (
  { params, response }: { params: { pid: string }; response: any },
) => {
  let choosePlace = DUMMY_PLACES.find((p) => p.id === params.pid);
  if (choosePlace) {
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== params.pid);
    response.status = 200;
    response.body = { message: "Delete successfully" };
  } else {
    response.status = 404;
    response.body = { message: "Delete fail" };
  }
};

export {
  createPlace,
  getAllPlaces,
  getPlaceById,
  getPlacesbyUserId,
  updatePlace,
  deletePlace,
};

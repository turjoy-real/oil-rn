import moment from "moment";

class Client {
  constructor(id, clientName, phoneNumber, companyName, address, dateJoined) {
    this.id = id;
    this.clientName = clientName;
    this.phoneNumber = phoneNumber;
    this.companyName = companyName;
    this.address = address;
    this.dateJoined = dateJoined;
  }

  get readableDate() {
    return moment(this.dateJoined).format("MMMM Do YYYY, hh:mm");
  }
}

export default Client;

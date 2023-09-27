class SessionModel {
  constructor(client, reservations, equipments, createdAt, endAt) {
    this.client = {
      address: client.address,
      name: client.name,
      phone: client.phone,
      siren: client.siren,
    };
    this.reservations = [];
    this.equipments = [];
    this.createdAt = createdAt;
    this.endAt = endAt;
  }
}

module.exports = SessionModel;

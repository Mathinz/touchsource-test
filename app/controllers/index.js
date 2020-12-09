const db = require('../models');
const csv = require('csv-parser');
const fs = require('fs');
const Users = db.users;
const Op = db.Sequelize.Op;

exports.createUser = async (req, res) => {
  console.log(req.body.first, req.body.last);
  if (!(req.body.first || req.body.last)) {
    res.status(400).send({
      message: 'First and last name are required',
    });
    return;
  }
  try {
    const User = {
      first: req.body.first,
      last: req.body.last,
    };

    const data = await Users.create(User);
    if (!data) return res.status(200).send({ success: false, message: 'User couldn not be created' });
    res.status(200).send({ success: true, user: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message || 'Something went wrong' });
  }
};

exports.findAllPeople = async (req, res) => {
  try {
    const data = await Users.findAll({
      order: [
        ['last', 'ASC'],
        ['first', 'ASC'],
      ],
    });
    if (data.length === 0) return res.status(200).send({ success: false, message: 'No user found' });
    res.status(200).send({ success: true, users: data });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message || 'Something went wrong' });
  }
};

exports.findPersonByName = async (req, res) => {
  if (!(req.params.first || req.params.last)) {
    res.status(400).send({
      message: 'First and last name are required',
    });
    return;
  }
  const first = req.params.first;
  const last = req.params.last;
  try {
    const data = await Users.findOne({
      where: {
        first: first,
        last: last,
      },
    });

    if (!data) return res.status(200).send({ success: false, message: 'user not found' });

    res.status(200).send({ success: true, user: data });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message || 'Something went wrong' });
  }
};

exports.parseCsv = async (req, res) => {
  try {
    console.log('parseCsv');
    const results = [];
    fs.createReadStream('./app/data-files/mock_data_csv.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        let mappedUsers = await Promise.all(
          results.map((usr) => {
            return { first: usr.first, last: usr.last };
          })
        );
        const allUsers = await Users.bulkCreate(mappedUsers);
        res.status(200).send({ success: true, result: allUsers });
      });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message || 'Something went wrong' });
  }
};

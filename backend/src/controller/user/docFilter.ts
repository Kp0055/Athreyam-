
import Doctor from '../../models/Doctor/Doctor';

const filterDoc = async (req: any, res: any) => {
  const filters = req.body;

  console.log('Received filters:', filters);

  try {
    // Build MongoDB query object dynamically
    const query: any = {};

    if (filters.genders?.length) {
      query.gender = { $in: filters.genders };
    }

    if (filters.availability?.length) {
      query.availability = { $in: filters.availability };
    }

    if (filters.specialities?.length) {
      query.speciality = { $in: filters.specialities };
    }

    if (filters.experience?.length) {
      query.experience = { $in: filters.experience };
    }

    if (filters.consultations?.length) {
      query.consultation = { $in: filters.consultations };
    }

    if (filters.ratings?.length) {
      query.rating = { $in: filters.ratings };
    }

    if (filters.languages?.length) {
      query.language = { $in: filters.languages };
    }

    // Fetch filtered doctors from the database
    const filteredDoctors = await Doctor.find(query);

    console.log(filteredDoctors,"filter data from backend to frontend ")

    return res.status(200).json({
      success: true,
      data: filteredDoctors,
    });
  } catch (error) {
    console.error('Filter error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while filtering doctors.',
    });
  }
};

export default filterDoc;


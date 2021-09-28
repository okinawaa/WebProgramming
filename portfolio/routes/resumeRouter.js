const router = require('express').Router();
const resumeCtrl = require('../controllers/resumeCtrl');

router.route('/certifications')
    .get(resumeCtrl.getCertifications)
router.route('/skills')
    .get(resumeCtrl.getSkills)
router.route('/workingExperiences')
    .get(resumeCtrl.getWorkingExperiences)
router.route('/educationExperiences')
    .get(resumeCtrl.getEducationExperiences)
router.route('/workingExperienceImages')
    .post(resumeCtrl.getWorkingExperienceImages)
router.route('/educationExperienceImages')
    .post(resumeCtrl.getEducationExperienceImages)
module.exports = router;

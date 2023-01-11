import { body } from 'express-validator'
import IEM from '../../utils/intErrorMessages.js'
import titleCase from '../../utils/titleCase.js'
import Owner from '../models/owner.js'

const validators = [
    body("name").custom(value => {
        return Owner.findOne({ name: titleCase(value) }).then(owner => {
            if (owner) {
                return Promise.reject(IEM("FR", "E00013"))
            }
        })
    })
]

export default validators
const data = require('./data');

'use strict'

const args = process.argv

function isEmpty(arr) {
    return (Array.isArray(arr) && arr.length)
}

// This function filters out every animal that does not match the string pattern
const removeNonMatching = (searchedStr, person) => {
    return person.animals.map((animal) => {
        if (searchedStr.length !== 0 && animal.name.includes(searchedStr)) {
            return animal;
        }
    }).filter(e => e)
}

const filter = (searchedStr) => {
    const newList = data.filter(q => {
        let newCountry = q
        newCountry.people = q.people.filter(p => {
            let newPerson = p
            newPerson.animals = removeNonMatching(searchedStr, p)

            // The 'animals' entry will be removed if there is nothing left inside
            return isEmpty(newPerson.animals)
        })

        // The 'people' entry will be removed if there is nothing left inside
        return (isEmpty(newCountry.people))
    });

    // prints out the filtered list if there is any match
    console.log((!isEmpty(newList)) ? 'Nothing found' : JSON.stringify(newList))
    return (!isEmpty(newList)) ? 'Nothing found' : JSON.stringify(newList)
}

const count = () => {
    const newList = data.map((country) => {
        country.people.map((person) => {
            person.name = `${person.name} [${person.animals.length}]`
            return person
        })
        country.name = `${country.name} [${country.people.length}]`
        return country
    })
    console.log(JSON.stringify(newList))
    return JSON.stringify(newList)
}

const filterAndCount = (searchedStr) => {
    const filtered = filter(searchedStr)
    if(filtered == 'Nothing found') {
        return 'Nothing found'
    }
    return count(filtered)
}

// USAGE: node app.js --filter=[PATTERN] OR node app.js filter=[PATTERN]
// USAGE: node app.js --count OR node app.js count

try {
    // If the user wants to filter the data by a string pattern (e.g. 'ry') 
    if (args.length > 2 && args.length < 4) {
        const cmd = args[2].split("=")
        if (cmd[0] === '--filter' || cmd[0] === 'filter') {
            filter(cmd[1])
        } else if (cmd[0] === '--count' || cmd[0] === 'count') {
            count()
        } else {
            console.log('Wrong arguments')
        }
    } else if (args.length > 2 && args.length === 4) {
        const cmd1 = args[2].split("=")
        const cmd2 = args[3].split("=")

        if ((cmd1[0] === '--filter' || cmd1[0] === 'filter') && (cmd2[0] === '--count' || cmd2[0] === 'count')) {
            const filtered = filter(cmd1[1])
            count(filtered)
        } else if ((cmd1[0] === '--count' || cmd1[0] === 'count') && (cmd2[0] === '--filter' || cmd2[0] === 'filter')) {
            const filtered = filter(cmd2[1])
            count(filtered)
        } else {
            console.log('Wrong arguments')
        }
    }
} catch (err) {
    throw err
}


module.exports = {
    count, filter, filterAndCount
}

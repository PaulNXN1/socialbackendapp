// Data for models [user and thoughts]

// Contains two arrays for data

const users = [
    {username: 'Paul', email: 'paul@rock.com'},
    {username: 'Freya', email: 'freya@rock.com'},
    {username: 'Stevie', email: 'stevie@rock.com'}];


    const thoughts = [
    {thoughtText: `I hate lazy people.`, username: 'Paul'},
    {thoughtText: 'Woof Woof, I am a dog.', username: 'Freya'},
    {thoughtText: 'Fleetwood Mac is my band', username: 'Stevie'}
    
    ];
    
    // Exporting users and thoughts

    module.exports = { thoughts, users };
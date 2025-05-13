import fhr from '@terzitech/flathier';
    // use flathier lib to init the reqtext project
    try {
        fhr.init('ReqTextDemo', 'reqt');
    } catch (error) {
        console.error('Error initializing fhr:', error);
    }


    // Load the data
    try {
        const data = await fhr.loadData();
        console.log('Data loaded:', data);

        // Create ASCII tree from data using outline and title fields
        const treeRows = await fhr.createAsciiTree(data, ['outline', 'title']);
        console.log('ASCII Tree:\n' + treeRows.join(''));
    } catch (error) {
        console.error('Error loading data:', error);
    }


import fhr from '@terzitech/flathier';

    try {
        fhr.init('ReqTextDemo', 'reqt');
    } catch (error) {
        console.error('Error initializing fhr:', error);
    }


    // Load the data
    try {
        const data = await fhr.loadData();
        console.log('Data loaded:', data);
    } catch (error) {
        console.error('Error loading data:', error);
    }
import Firebase from 'firebase';
import MobxFirebaseStore from 'mobx-firebase-store';

const tweets_subkey = 'tweets';

export default class TweetStore extends MobxFirebaseStore {

	constructor(config) {
		const fbApp = Firebase.initializeApp(config);
		const store = new MobxFirebaseStore(Firebase.database(fbApp).ref());
        super(store.fb);
    }

	resolveFirebaseQuery(sub) { 
		return this.fb.child(tweets_subkey).orderByChild('timestamp').limitToLast(10) 
	}

    createTweet(tweet) {
    	this.fb.child(tweets_subkey).push(tweet);
    }
    
    getTweets() {
        return this.getData(tweets_subkey);
    }

    allTweetsSubs() {
        return [{
            subKey: tweets_subkey,
            asList: true
        }];
    }

}
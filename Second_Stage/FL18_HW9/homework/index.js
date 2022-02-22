class MagazineStatus {
  constructor(status) {
    this.Status = status;
  }

  next() {
    return new this.Status();
  }
}

class ReadyForPushNotification extends MagazineStatus {
  constructor() {
    super(ReadyForApprove);
  }

  publish(name) {
    console.log(`Hello ${name}. You can't publish. We are creating publications now. `)
  }

  approve(name, department) {
    const ENOUGH_PUBLICATIONS = 5;
    const articlesLength = Object.keys(this.articles).length;

    if (department !== 'manager') {
      console.log('You do not have permission to approve');
    } else if (articlesLength < ENOUGH_PUBLICATIONS && department === 'manager') {
      console.log(`Hello ${name}. You can't approve. We don't have enough of publications`);
    } else {
      this.nextState();
      this.state.approve.call(this, name);
    }
  }
}

class ReadyForApprove extends MagazineStatus {
  constructor() {
    super(ReadyForPublish);
  }

  publish(name) {
    console.log(`Hello ${name}. You can't publish. We don't have a manager's approval.`)
  }

  approve(name) {
    console.log(`Hello ${name}. You've approved the changes`)
    this.nextState();
  }
}

class ReadyForPublish extends MagazineStatus {
  constructor() {
    super(PublishInProgress);
  }

  publish(name) {
    console.log(`Hello ${name}. You've recently published publications.`);
    this.nextState();
    this.state.approve.call(this, name);
  }

  approve(name, department) {
    if (department === 'manager') {
      console.log(`Hello ${name}. Publications have been already approved by you.`);
    } else {
      console.log('You do not have permission to approve')
    }
  }
}

class PublishInProgress extends MagazineStatus {
  constructor() {
    super(ReadyForPushNotification);
  }

  publish(name) {
    console.log(`Hello ${name}. While we are publishing we can't do any actions.`)
  }

  approve(name) {
    if (!this.noAction) {
      if (this.articles) {
        const topicPosts = {};
        const topics = [];

        for (let [article, followers] of Object.entries(this.articles)) {
         followers.forEach(follower => {
           if (topicPosts[follower.topic]) {
             topicPosts[follower.topic].push(`${article} ${follower.name}`)
           } else {
             topicPosts[follower.topic] = [`${article} ${follower.name}`]
           }

           if (!topics.includes(follower.topic)) {
             topics.push(follower.topic)
           }
         })
        }

        for (let topic of topics) {
          topicPosts[topic].forEach(post => {
            console.log(post)
          })
        }

        this.articles = [];
      }

      const INACTIVITY_TIMER = 60000;
      this.noAction = true;

      setTimeout(() => {
        delete this.noAction;
        this.nextState();
      }, INACTIVITY_TIMER)
    } else {
      console.log(`Hello ${name}. While we are publishing we can't do any actions`)
    }
  }
}

class Magazine {
  constructor() {
    this.staff = [];
    this.articles = {};
    this.followers = [];
    this.state = new ReadyForPushNotification(); // setting default as ReadyForPushNotification
  }

  nextState() {
    this.state = this.state.next();
  }
}

class MagazineEmployee {
  constructor(name, department, magazine) {
    this.name = name;
    this.department = department;
    this.magazine = magazine;

    magazine.staff.push(this)
  }

  addArticle(article) {
    const followers = this.magazine.followers;

    followers.forEach(follower => {
      if (follower.topic === this.department) {
        if (Object.keys(this.magazine.articles).includes(article)) {
          this.magazine.articles[article].push(follower);
        } else {
          this.magazine.articles[article] = [follower];
        }
      }
    })
  }

  approve() {
    this.magazine.state.approve.call(this.magazine, this.name, this.department);
  }

  publish() {
    this.magazine.state.publish.call(this.magazine, this.name, this.department);
  }
}

class Follower {
  constructor(name) {
    this.name = name;
  }

  subscribeTo(magazine, topic) {
    if (this.topic) {
      this.topic = [...this.topic, topic]
    } else {
      this.topic = topic;
    }

    magazine.followers.push( {...this, topic} )
  }

  unsubscribeFrom(magazine, topic) {
    magazine.followers = magazine.followers.filter(follower => {
      return !(follower.name === this.name && follower.topic === topic);
    })
  }
}

// const magazine = new Magazine();
// const manager = new MagazineEmployee('Andrii', 'manager', magazine);
// const sport = new MagazineEmployee('Serhii', 'sport', magazine);
// const politics = new MagazineEmployee('Volodymyr', 'politics', magazine);
// const general = new MagazineEmployee('Olha', 'general', magazine);

// console.log(magazine)
// console.log(manager)
// console.log(sport)
// console.log(politics)
// console.log(general)

// const iryna = new Follower('Iryna');
// const maksym = new Follower('Maksym');
// const mariya = new Follower('Mariya');

// console.log(iryna)
// console.log(maksym)
// console.log(mariya)

// iryna.subscribeTo(magazine, 'sport');
// maksym.subscribeTo(magazine, 'politics');
// mariya.subscribeTo(magazine, 'politics');
// mariya.subscribeTo(magazine, 'general');
//
// sport.addArticle('something about sport');
// politics.addArticle('something about politics');
// general.addArticle('some general information');
// politics.addArticle('something about politics again');

// sport.approve(); //you do not have permissions to do it
// manager.approve(); //Hello Andrii. You can't approve. We don't have enough of publications
// politics.publish(); //Hello Volodymyr. You can't publish. We are creating publications now.
// sport.addArticle('news about sport');
// manager.approve(); //Hello Andrii. You've approved the changes
// sport.publish(); //Hello Serhii. You've recently published publications.

// manager.approve('news about sport'); //Hello Andrii. While we are publishing we can't do any actions

// mariya.unsubscribeFrom(magazine, 'general');

// console.log(magazine)
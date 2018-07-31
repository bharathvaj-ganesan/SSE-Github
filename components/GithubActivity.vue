<template>
   <v-list two-line style="background:none">
      <v-subheader> Github Notifications </v-subheader>

    <template v-for="(event, index) in recentEvents">


      <v-divider inset :key="index"></v-divider>

      <v-list-tile
        :key="event.title"
        avatar
      >
        <v-list-tile-avatar>
          <img :src="event.avatar">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title v-html="event.title"></v-list-tile-title>
          <v-list-tile-sub-title v-html="event.subtitle"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
	data() {
		return {
			evtSource: null,
			events: []
		};
	},
	computed: {
		recentEvents: function() {
			return this.events.slice(Math.max(this.events.length - 20, 1));
		}
	},
	beforeMount() {
		this.evtSource = new EventSource('/events');
		this.evtSource.addEventListener('event', evt => {
			try {
				const eventData = JSON.parse(evt.data);
				this.events.push({
					userId: eventData.actor.login,
					avatar: eventData.actor.avatar_url,
					repoName: eventData.repo.name,
					title: `<h4><a href="https://github.com/${eventData.actor.login}">${
						eventData.actor.login
					}</a>${this.describeAction(eventData)}<a href="https://github.com/${eventData.repo.name}">${
						eventData.repo.name
					}</a></h4>`,
					subtitle: `<p>${eventData.created_at}</p>`
				});
			} catch (err) {
				console.log('Something went wrong');
			}
		});
	},
	methods: {
		describeAction(event) {
			switch (event.type) {
				case 'PushEvent':
					return ' pushed to ';
					break;
				case 'CommitCommentEvent':
					return ' commented on a commit in ';
					break;
				case 'CreateEvent':
					return ' created a ' + event.payload.ref_type + ' ';
					break;
				case 'DeleteEvent':
					return ' deleted a ' + event.payload.ref_type + ' on ';
					break;
				case 'ForkEvent':
					return ' forked ';
					break;
				case 'GollumEvent':
					return ' updated the wiki on ';
					break;
				case 'IssueCommentEvent':
					return ' commented on a issue in ';
					break;
				case 'IssuesEvent':
					return ' ' + event.payload.action + ' an issue in ';
					break;
				case 'MemberEvent':
					return ' added ' + event.member.login + ' to ';
					break;
				case 'PublicEvent':
					return ' open sourced ';
					break;
				case 'PullRequestEvent':
					return ' ' + event.payload.action + ' a pull request in ';
					break;
				case 'PullRequestReviewCommentEvent':
					return ' commented on a pull request diff in ';
					break;
				case 'ReleaseEvent':
					return ' published a new release of ';
					break;
				case 'WatchEvent':
					return ' starred ';
					break;
				default:
					return event.type.toString();
			}
		}
	}
};
</script>


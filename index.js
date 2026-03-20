/*
 * Eyad's system
 * Property of Eyad
 */

const { Client, Collection, GatewayIntentBits, ChannelType, AuditLogEvent , Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder , AttachmentBuilder, ButtonStyle , Message, ActivityType } = require("discord.js");
const moment = require('moment');
const ms = require('ms')
const { Database } = require("st.db")
const discordTranscripts = require('discord-html-transcripts');
const taxDB = new Database("/Json-db/Bots/taxDB.json")
const { PermissionsBitField } = require('discord.js')
const autolineDB = new Database("/Json-db/Bots/autolineDB.json")
const suggestionsDB = new Database("/Json-db/Bots/suggestionsDB.json")
const feedbackDB = new Database("/Json-db/Bots/feedbackDB.json")
const giveawayDB = new Database("/Json-db/Bots/giveawayDB.json")
const systemDB = new Database("/Json-db/Bots/systemDB.json")
const shortcutDB = new Database("/Json-db/Others/shortcutDB.json")
const protectDB = new Database("/Json-db/Bots/protectDB.json")
const logsDB = new Database("/Json-db/Bots/logsDB.json")
const nadekoDB = new Database("/Json-db/Bots/nadekoDB.json")
const one4allDB = new Database("/Json-db/Bots/one4allDB.json")
const ticketDB = new Database("/Json-db/Bots/ticketDB.json")

const path = require('path');
const { readdirSync } = require("fs");
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');
const { token, clientId, owner, prefix, guildId } = require('./config.js');
  global.theowner = owner;
  global.targetGuildId = guildId;
  const client27 = new Client({intents: 131071 , shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
  client27.commands = new Collection();
  client27.events = new Collection();
  const rest = new REST({ version: '10' }).setToken(token);
  client27.setMaxListeners(1000)

const { updateGiveawayAtomic } = require('./giveawayLock.js');

    require("./handlers/suggest")(client27)
    require('./handlers/tax4bot')(client27)
    require("./handlers/autorole")(client27)
    require(`./handlers/claim`)(client27);
    require(`./handlers/close`)(client27);
    require(`./handlers/create`)(client27);
    require(`./handlers/reset`)(client27);
    require(`./handlers/support-panel`)(client27);
    require('./handlers/joinGiveaway')(client27)
    require(`./handlers/applyCreate`)(client27)
    require(`./handlers/applyResult`)(client27)
    require(`./handlers/applySubmit`)(client27)
    require(`./handlers/info`)(client27)
    require('./handlers/imageDelete')(client27)
    require('./handlers/picsRoom')(client27)
    require('./handlers/autoreaction')(client27)
    require('./handlers/jail')(client27)
    require('./handlers/autoreply')(client27)
    require('./handlers/luckywheel')(client27)
    require('./handlers/greetmessage')(client27)
    require('./handlers/boosters')(client27)
    require('./handlers/helpButtons')(client27)
    require('./handlers/protection')(client27)
    require('./handlers/protectionWhitelist')(client27)
    require('./handlers/protectionPanel')(client27)
    require('./handlers/logs')(client27)
    require('./handlers/autoscanner')(client27)
    require('./handlers/broadcast')(client27)
    require('./handlers/announcementTranslate')(client27)
    require('./handlers/antiMention')(client27)
    require('./handlers/antiNickname')(client27)
    require('./handlers/warnShortcut')(client27)
    require('./handlers/onlyBotSay')(client27)

  const folderPath = path.join(__dirname, 'slashcommand27');
  client27.one4allSlashCommands = new Collection();
  const one4allSlashCommands = [];
  const ascii = require("ascii-table");
  const table = new ascii("one4all commands").setJustify();
  for (let folder of readdirSync(folderPath).filter(
    (folder) => !folder.includes(".")
    )) {
      for (let file of readdirSync(`${folderPath}/` + folder).filter((f) =>
      f.endsWith(".js")
      )) {
        let command = require(`${folderPath}/${folder}/${file}`);
        if (command) {
          one4allSlashCommands.push(command.data.toJSON());
          client27.one4allSlashCommands.set(command.data.name, command);
          if (command.data.name) {
            table.addRow(`/${command.data.name}`, "🟢 Working");
          } else {
            table.addRow(`/${command.data.name}`, "🔴 Not Working");
          }
        }
  }
}

        for (let file of readdirSync('./events/').filter(f => f.endsWith('.js'))) {
                const event = require(`./events/${file}`);
        if (event.once) {
                client27.once(event.name, (...args) => event.execute(...args));
        } else {
                client27.on(event.name, (...args) => event.execute(...args));
        }
        }

  client27.on("messageCreate" , async(message) => {
    if (!message.guild) return;
    if (guildId && message.guild?.id !== guildId) return;

    if (message.content === "-توب" || message.content === "-top") {
        const command = client27.one4allSlashCommands.get('top-points');
        if (command) {
            const interaction = {
                guild: message.guild,
                user: message.author,
                member: message.member,
                channel: message.channel,
                isChatInputCommand: () => false,
                reply: (options) => {
                    return message.reply(options);
                },
                deferReply: () => Promise.resolve(),
                editReply: (options) => message.reply(options),
                followUp: (options) => message.reply(options)
            };
            return command.execute(interaction);
        }
    }

    if (message.content === "-توب اسبوعي" || message.content === "-topweekly") {
        const command = client27.one4allSlashCommands.get('top-weekly');
        if (command) {
            const interaction = {
                guild: message.guild,
                user: message.author,
                member: message.member,
                channel: message.channel,
                isChatInputCommand: () => false,
                reply: (options) => {
                    return message.reply(options);
                },
                deferReply: () => Promise.resolve(),
                editReply: (options) => message.reply(options),
                followUp: (options) => message.reply(options)
            };
            return command.execute(interaction);
        }
    }

    if(message.content == "test"){
      message.reply(`works fine`).catch(err => console.log("Failed to reply to test message:", err.message));
    }
  })

  client27.on("interactionCreate" , async(interaction) => {
    if (interaction.isChatInputCommand()) {
      
            if(interaction.user.bot) return;
            
            if (guildId && interaction.guild?.id !== guildId) {
              return interaction.reply({content: `❗ البوت ده مش شغال على السيرفر ده`, ephemeral: true});
            }

      const command = client27.one4allSlashCommands.get(interaction.commandName);
            
      if (!command) {
        return;
      }
      
      const additionalOwners = one4allDB.get('additional_owners') || [];
      const isOwner = (owner == interaction?.user?.id) || additionalOwners.includes(interaction?.user?.id);

      if (command.ownersOnly === true) {
        if (!isOwner) {
          return interaction.reply({content: `❗ مش مسموحلك تستخدم الأمر ده`, ephemeral: true});
        }
      }
        if (command.adminsOnly === true) {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({ content: `❗ لازم تكون أدمن عشان تستخدم الأمر ده`, ephemeral: true });
            }
        }
      try {

        await command.execute(interaction);
      } catch (error) {
                        return console.log("🔴 | error in one4all bot" , error)
                }
    }
  } )

process.on('uncaughtException', (err) => {
  console.log(err)
});
process.on('unhandledRejection', (reason, promise) => {
 console.log(reason)
});
 process.on("uncaughtExceptionMonitor", (reason) => { 
        console.log(reason)
});

    client27.on(Events.ClientReady , async() => {
    console.log(`--- Eyad's System ---\n--- This Bot is Made by Eyad ---`);

    const http = require('http');
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log("Port already in use, skipping health check server.");
      } else {
        console.error('Health check server error:', err);
      }
    });

    server.listen(5000, '0.0.0.0', () => {
      console.log('Health check server running on port 5000');
    });

    try {
      const maxCommands = 100;
      let commandsToRegister = one4allSlashCommands;
      if (one4allSlashCommands.length > maxCommands) {
        console.log(`⚠️ Warning: ${one4allSlashCommands.length} commands found, but Discord limit is ${maxCommands}. Registering first ${maxCommands} only.`);
        commandsToRegister = one4allSlashCommands.slice(0, maxCommands);
      }
      console.log(`Registering ${commandsToRegister.length} slash commands...`);
      await rest.put(
        Routes.applicationCommands(client27.user.id),
        { body: commandsToRegister },
      ).then(() => console.log('Successfully registered slash commands.'))
      .catch(err => console.error("Error registering slash commands:", err));
    } catch (error) {
      console.error(error)
    }

    setInterval(() => {
        const now = new Date();
        if (now.getDay() === 0 && now.getHours() === 0 && now.getMinutes() === 0) {
            const allData = ticketDB.all();
            if (Array.isArray(allData)) {
                allData.forEach(item => {
                    if (item.ID && typeof item.ID === 'string' && item.ID.startsWith('ticket_weekly_points_')) {
                        ticketDB.delete(item.ID);
                    }
                });
            }
            console.log('✅ Weekly ticket points reset performed.');
        }
    }, 60000);

    client27.guilds.cache.forEach(guild => {
        guild.members.fetch().then(members => {
            if (members.size < 10) {
                console.log(`one4all bot : Guild: ${guild.name} has less than 10 members`);
            }
        }).catch(console.error);
    });

    let theguild = guildId ? client27.guilds.cache.get(guildId) : client27.guilds.cache.first();
    if (!theguild && guildId) {
      console.log('⚠️ Guild not found in config, please check the ID.');
      return;
    }
    
    if (theguild) {
      let giveaways = giveawayDB.get(`giveaways_${theguild.id}`);
      if (giveaways && Array.isArray(giveaways) && giveaways.length > 0) {
        const giveawaysToEnd = [];
        
        for (const giveaway of giveaways) {
          if (giveaway.ended) {
            continue;
          }
          
          if (giveaway.duration <= 0) {
            giveawaysToEnd.push(giveaway);
          }
        }
        
        for (const giveaway of giveawaysToEnd) {
          try {
            const theroom = theguild.channels.cache.find(ch => ch.id == giveaway.channelid);
            if (theroom) {
              await theroom.messages.fetch(giveaway.messageid).catch(() => null);
              const themsg = await theroom.messages.cache.find(msg => msg.id == giveaway.messageid);
              if (themsg) {
                await endGiveaway(giveaway, themsg, theguild);
              }
            }
          } catch (error) {
            console.error('Error checking giveaway on startup:', error);
          }
        }
      }
    }
    
    setInterval(async () => {
        if(!theguild) return;
      let giveaways = giveawayDB.get(`giveaways_${theguild.id}`)
      if(!giveaways || giveaways.length === 0) return;
      
      for (let i = 0; i < giveaways.length; i++) {
        const giveaway = giveaways[i];
        let {messageid , channelid , entries , winners , prize , duration,dir1,dir2,ended, settings, requiredRole, requiredInvites, host} = giveaway;
        
        if (ended) continue;
        
        if (!giveaway.lastUpdate) {
          giveaway.lastUpdate = 0;
        }
        
        if(duration > 0) {
          const updateResult = await updateGiveawayAtomic(theguild.id, messageid, (giveaway) => {
            if (!giveaway.ended) {
              giveaway.duration = (giveaway.duration || duration) - 1;
              giveaway.lastUpdate = (giveaway.lastUpdate || 0) + 1;
              return { duration: giveaway.duration, lastUpdate: giveaway.lastUpdate };
            }
            return null;
          });
          
          if (updateResult && updateResult.lastUpdate >= 15) {
            await updateGiveawayAtomic(theguild.id, messageid, (giveaway) => {
              if (!giveaway.ended) {
                giveaway.lastUpdate = 0;
              }
            });
              
            try {
              const theroom = theguild.channels.cache.find(ch => ch.id == channelid)
              if (theroom) {
                await theroom.messages.fetch(messageid).catch(() => null);
                const themsg = await theroom.messages.cache.find(msg => msg.id == messageid)
                if (themsg) {
                  const currentGiveaways = giveawayDB.get(`giveaways_${theguild.id}`) || [];
                  const currentGiveaway = currentGiveaways.find(g => g.messageid === messageid);
                  if (!currentGiveaway) continue;
                  const currentEntries = currentGiveaway.entries || [];
                  
                  let description = `بينتهي : <t:${dir1}:R> (<t:${dir1}:f>)\nاللي عامله : <@${host}>\nالمشتركين : **${currentEntries.length}**\nعدد الفايزين: **${winners}**`;
                  if (requiredRole) {
                    description += `\n**الرتبة المطلوبة:** <@&${requiredRole}>`;
                  }
                  if (requiredInvites) {
                    description += `\n**الدعوات المطلوبة:** ${requiredInvites}`;
                  }
                  
                  const settingsData = settings || {colour: '#5865f2'};
                  const embed = new EmbedBuilder()
                    .setTitle(`**${prize}**`)
                    .setDescription(description)
                    .setColor(settingsData.colour)
                    .setTimestamp(dir2);

                  if (settingsData.thumbnail === 'server_icon') {
                    embed.setThumbnail(theguild.iconURL({ dynamic: true }));
                  }
                  if (settingsData.giveawayImage) {
                    embed.setImage(settingsData.giveawayImage);
                  }
                  
                  if (settingsData.type === 'button') {
                    const button = new ButtonBuilder()
                      .setEmoji(settingsData.emoji)
                      .setStyle(ButtonStyle.Primary)
                      .setCustomId(`join_giveaway`)
                      .setDisabled(false)
                    const row = new ActionRowBuilder().addComponents(button)
                    await themsg.edit({embeds:[embed], components:[row]}).catch(() => {});
                  } else {
                    await themsg.edit({embeds:[embed]}).catch(() => {});
                  }
                }
              }
            } catch (error) {
              console.error('Error updating giveaway message:', error);
            }
          }
          
        }else if(duration == 0) {
          try {
            const theroom = theguild.channels.cache.find(ch => ch.id == channelid)
            if (theroom) {
              await theroom.messages.fetch(messageid).catch(() => null);
              const themsg = await theroom.messages.cache.find(msg => msg.id == messageid)
              if (themsg) {
                await endGiveaway(giveaway, themsg, theguild);
                return;
              }
            }
          } catch (error) {
            console.error('Error ending giveaway:', error);
          }
        }
      }
    }, 1000);
  
  })

async function endGiveaway(giveaway, themsg, theguild) {
  try {
    if (giveaway.ended) return;
    
    const markedEnded = await updateGiveawayAtomic(theguild.id, giveaway.messageid, (g) => {
      if (g.ended) return false;
      g.ended = true;
      return true;
    });
    
    if (!markedEnded) return;
    
    giveaway.ended = true;
    
    let {messageid, entries, winners, prize, settings, dir1, dir2, host, requiredRole, requiredInvites} = giveaway;
    const settingsData = settings || {
      emoji: '🎉',
      type: 'button',
      winnerMessage: 'مبروك [user]! كسبت **[prize]**! 🎉'
    };

    if(entries.length > 0 && entries.length >= winners) {
      const theWinners = [];
      for(let i = 0; i < winners; i++) {
        let winner = Math.floor(Math.random() * entries.length);
        let winnerExcept = entries.splice(winner, 1)[0];
        theWinners.push(winnerExcept);
      }

      const winnerNames = [];
      const winnerMentions = [];
      for (const winnerId of theWinners) {
        winnerNames.push(`<@${winnerId}>`);
        winnerMentions.push(`<@${winnerId}>`);
      }

      let description = `**الجيف أواي خلص**\nاللي عامله : <@${host}>\nالفايزين: ${winnerNames.join(', ')}`;
      if (requiredRole) {
        description += `\n**الرتبة المطلوبة:** <@&${requiredRole}>`;
      }
      if (requiredInvites) {
        description += `\n**الدعوات المطلوبة:** ${requiredInvites}`;
      }

      const endedEmbed = new EmbedBuilder()
        .setTitle(`**${prize}**`)
        .setDescription(description)
        .setColor('#FF0000')
        .setTimestamp();

      if (settingsData.thumbnail === 'server_icon') {
        endedEmbed.setThumbnail(theguild.iconURL({ dynamic: true }));
      }
      if (settingsData.giveawayImage) {
        endedEmbed.setImage(settingsData.giveawayImage);
      }

      if (settingsData.type === 'button') {
        const button = new ButtonBuilder()
          .setEmoji(settingsData.emoji)
          .setStyle(ButtonStyle.Primary)
          .setCustomId(`join_giveaway`)
          .setDisabled(true)
        const row = new ActionRowBuilder().addComponents(button)
        await themsg.edit({embeds:[endedEmbed], components:[row]}).catch(() => {});
      } else {
        await themsg.edit({embeds:[endedEmbed]}).catch(() => {});
      }

      let winnerMessage = settingsData.winnerMessage || 'مبروك [user]! كسبت **[prize]**! 🎉';
      winnerMessage = winnerMessage.replace(/\[user\]/g, winnerMentions.join(' '));
      winnerMessage = winnerMessage.replace(/\[prize\]/g, prize);
      
      await themsg.reply({content: winnerMessage}).catch(() => {});
    } else {
      let description = `**الجيف أواي خلص**\nاللي عامله : <@${host}>\nالفايزين: مفيش\n**مفيش مشتركين كفاية**`;
      if (requiredRole) {
        description += `\n**الرتبة المطلوبة:** <@&${requiredRole}>`;
      }
      if (requiredInvites) {
        description += `\n**الدعوات المطلوبة:** ${requiredInvites}`;
      }

      const endedEmbed = new EmbedBuilder()
        .setTitle(`**${prize}**`)
        .setDescription(description)
        .setColor('#FF0000')
        .setTimestamp();

      if (settingsData.thumbnail === 'server_icon') {
        endedEmbed.setThumbnail(theguild.iconURL({ dynamic: true }));
      }
      if (settingsData.giveawayImage) {
        endedEmbed.setImage(settingsData.giveawayImage);
      }

      if (settingsData.type === 'button') {
        const button = new ButtonBuilder()
          .setEmoji(settingsData.emoji)
          .setStyle(ButtonStyle.Primary)
          .setCustomId(`join_giveaway`)
          .setDisabled(true)
        const row = new ActionRowBuilder().addComponents(button)
        await themsg.edit({embeds:[endedEmbed], components:[row]}).catch(() => {});
      } else {
        await themsg.edit({embeds:[endedEmbed]}).catch(() => {});
      }
      
      await themsg.reply({content:`**مفيش مشتركين كفاية للسحب**`}).catch(() => {});
    }
    
    let giveaways = giveawayDB.get(`giveaways_${theguild.id}`);
    const updatedGiveaways = giveaways.filter(g => g.messageid !== messageid);
    await giveawayDB.set(`giveaways_${theguild.id}`, updatedGiveaways);
    
  } catch (error) {
    console.error('Error in endGiveaway function:', error);
  }
}

client27.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  let roomid = taxDB.get(`tax_room_${message?.guild?.id}`);
  let taxLine = taxDB.get(`tax_line_${message?.guild?.id}`);
  let taxMode = taxDB.get(`tax_mode_${message?.guild?.id}`) || 'embed'; 
  let taxColor = taxDB.get(`tax_color_${message?.guild?.id}`) || '#0099FF'; 

  if (roomid) {
    if (message.channel.id === roomid) {
      if (message.author.bot) return;

      let number = message.content;

      if (number.endsWith("k")) number = number.replace(/k/gi, "") * 1000;
      else if (number.endsWith("K")) number = number.replace(/K/gi, "") * 1000;
      else if (number.endsWith("m")) number = number.replace(/m/gi, "") * 1000000;
      else if (number.endsWith("M")) number = number.replace(/M/gi, "") * 1000000;

      if (isNaN(number) || number <= 0) {
        
        if (!message.content.startsWith('/')) {
            return message.delete().catch(() => {});
        }
        return;
      }

      let number2 = parseInt(number); 
      let tax = Math.floor(number2 * 20 / 19 + 1); 
      let tax2 = Math.floor(tax - number2); 
      let tax3 = Math.floor(tax * 20 / 19 + 1); 
      let tax4 = Math.floor(number2 * 0.02); 
      let tax5 = Math.floor(tax3 + tax4); 

      let description = `
🪙 المبلغ ** : ${number2}**
- ضريبة برو بوت **: ${tax}**
- المبلغ كامل مع ضريبة الوسيط **: ${tax3}**
- نسبة الوسيط 2 % **: ${tax4}**
- الضريبة كاملة مع نسبة الوسيط **: ${tax5}**
`;

      let btn1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`tax_${tax}`)
          .setLabel('Tax')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(`mediator_${tax5}`)
          .setLabel('Mediator')
          .setStyle(ButtonStyle.Secondary)
      );

      if (taxMode === 'embed') {
        let embed1 = new EmbedBuilder()
          .setColor(taxColor)
          .setDescription(description);
        
        if (message.guild.iconURL()) {
          embed1.setThumbnail(message.guild.iconURL({ dynamic: true }));
        }

        message.reply({ embeds: [embed1], components: [btn1] }).catch(err => console.error("Error replying to tax message:", err));

        if (taxLine) {
          message.channel.send({ files: [taxLine] });
        }
      } else {
        message.reply({ content: description, components: [btn1] });

        if (taxLine) {
          message.channel.send({ files: [taxLine] });
        }
      }

      return;
    }
  }
});

client27.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const line = autolineDB.get(`line_${message?.guild?.id}`);
  const lineMode = autolineDB.get(`line_mode_${message?.guild?.id}`) || 'image'; 

  if (message.content === "-" || message.content === "خط") {
    if (line && message.member.permissions.has('ManageMessages')) {
      await message.delete();
      if (lineMode === 'link') {
        return message.channel.send({ content: `${line}` });
      } else if (lineMode === 'image') {
        return message.channel.send({ files: [line] });
      }
    }
  }
});
  
client27.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const autoChannels = autolineDB.get(`line_channels_${message?.guild?.id}`);
  if (autoChannels) {
    if (autoChannels.length > 0) {
      if (autoChannels.includes(message.channel.id)) {
        const line = autolineDB.get(`line_${message?.guild?.id}`);
        const lineMode = autolineDB.get(`line_mode_${message?.guild?.id}`) || 'image'; 

        if (line) {
          if (lineMode === 'link') {
            return message.channel.send({ content: `${line}` });
          } else if (lineMode === 'image') {
            return message.channel.send({ files: [line] });
          }
        }
      }
    }
  }
});

client27.on('messageCreate', async message => {
    if (message.author.bot) return;

    if(message.content == `قيمني`) {
        const designer = message.author;
        const designRole = '1271443664194895894';
        if (!message.member.roles.cache.has(designRole)) {
            return; 
        }

        const filter = response => !response.author.bot && response.author.id !== designer.id;

        message.channel.send(`من فضلك أكتب تقييمك للتصاميم، <@${designer.id}>`).then(() => {
            message.channel.awaitMessages({ filter, max: 1, errors: ['time'] })
                .then(async collected => {

                    const user = collected.first().author; 
                    const userText = collected.first().content;
                    const rankroom = '1278108478828843118';

                    const st1 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder().setCustomId('1star').setLabel('نجمة 1').setEmoji(`⭐`).setStyle(ButtonStyle.Danger),
                            new ButtonBuilder().setCustomId('2star').setLabel('نجمتين 2').setEmoji(`⭐`).setStyle(ButtonStyle.Danger),
                            new ButtonBuilder().setCustomId('3star').setLabel('3 نجوم').setEmoji(`⭐`).setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('4star').setLabel('4 نجوم').setEmoji(`⭐`).setStyle(ButtonStyle.Primary),
                            new ButtonBuilder().setCustomId('5star').setLabel('5 نجوم').setEmoji(`⭐`).setStyle(ButtonStyle.Primary)
                        );

                    await message.channel.send({ content: 'اختر عدد النجوم:', components: [st1] });

                    const buttonFilter = i => !i.user.bot && i.user.id !== designer.id;
                    const collector = message.channel.createMessageComponentCollector({ filter: buttonFilter, time: 60000 });

                    collector.on('collect', async interaction => {
                        if (!interaction.isButton()) return;

                        let embedDescription;
                        switch (interaction.customId) {
                            case '1star':
                                embedDescription = '⭐';
                                break;
                            case '2star':
                                embedDescription = '⭐⭐';
                                break;
                            case '3star':
                                embedDescription = '⭐⭐⭐';
                                break;
                            case '4star':
                                embedDescription = '⭐⭐⭐⭐';
                                break;
                            case '5star':
                                embedDescription = '⭐⭐⭐⭐⭐';
                                break;
                        }

                        const embedrank = new EmbedBuilder()
                            .setDescription(`${userText}\n**عدد النجوم:**\n${embedDescription}`)
                            .setColor('#808080')
                            .setAuthor({
                                name: user.username,
                                iconURL: user.displayAvatarURL()
                            });

                        const rankChannel = client27.channels.cache.get(rankroom);
                        if (rankChannel) {
                            await rankChannel.send({ content: `المصمم: <@${designer.id}>`, embeds: [embedrank] });
                            await interaction.reply({ content: 'تم إرسال تقييمك بنجاح، نشكرك لاستعمال خدماتنا', ephemeral: true });
                        } else {
                            await interaction.reply({ content: 'حدث خطأ، روم التقييم غير موجود.', ephemeral: true });
                        }
                            await interaction.message.delete();

                        collector.stop();
                    });

                    collector.on('end', collected => {
                        if (collected.size === 0) {
                            message.channel.send('لم يتم تلقي أي تقييمات.');
                        }
                    });
                })
                .catch(error => {
                    console.error('Error collecting messages: ', error);
                    message.channel.send('انتهى الوقت، لا يمكنك التقييم.');
                });
        });
    }
});

client27.on('messageCreate', async message => {
const cmd = await shortcutDB.get(`rate_cmd_${message?.guild?.id}`) || null;  
    if (message.author.bot) return;
  if (message.content === `${prefix}تقييم` || message.content === `${cmd}`) {
        const stafer = message.author;
        const staffRole = await feedbackDB.get(`staff_role_${message?.guild?.id}`);  
        if (!message.member.roles.cache.has(staffRole)) {
            return; 
        }

        const filter = response => !response.author.bot && response.author.id !== stafer.id;

        message.channel.send(`من فضلك أكتب تقييمك للاداري <@${stafer.id}>`).then(() => {
            message.channel.awaitMessages({ filter, max: 1, errors: ['time'] })
                .then(async collected => {

                    const user = collected.first().author; 
                    const userText = collected.first().content;
                    const rankroom = feedbackDB.get(`rank_room_${message?.guild?.id}`);

                    const st1 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder().setCustomId('1star').setLabel('نجمة 1').setEmoji(`⭐`).setStyle(ButtonStyle.Danger),
                            new ButtonBuilder().setCustomId('2star').setLabel('نجمتين 2').setEmoji(`⭐`).setStyle(ButtonStyle.Danger),
                            new ButtonBuilder().setCustomId('3star').setLabel('3 نجوم').setEmoji(`⭐`).setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId('4star').setLabel('4 نجوم').setEmoji(`⭐`).setStyle(ButtonStyle.Success),
                            new ButtonBuilder().setCustomId('5star').setLabel('5 نجوم').setEmoji(`⭐`).setStyle(ButtonStyle.Success)
                        );

                    await message.channel.send({ content: 'اختر عدد النجوم:', components: [st1] });

                    const buttonFilter = i => !i.user.bot && i.user.id !== stafer.id;
                    const collector = message.channel.createMessageComponentCollector({ filter: buttonFilter, time: 60000 });

                    collector.on('collect', async interaction => {
                        if (!interaction.isButton()) return;

                        let embedDescription;
                        switch (interaction.customId) {
                            case '1star':
                                embedDescription = '⭐';
                                break;
                            case '2star':
                                embedDescription = '⭐⭐';
                                break;
                            case '3star':
                                embedDescription = '⭐⭐⭐';
                                break;
                            case '4star':
                                embedDescription = '⭐⭐⭐⭐';
                                break;
                            case '5star':
                                embedDescription = '⭐⭐⭐⭐⭐';
                                break;
                        }

                        const embedrank = new EmbedBuilder()
                            .setDescription(`${userText}\n**عدد النجوم:**\n${embedDescription}`)
                            .setColor('Random')
                            .setAuthor({
                                name: user.username,
                                iconURL: user.displayAvatarURL()
                            });

                        const rankChannel = client27.channels.cache.get(rankroom);
                        if (rankChannel) {
                            await rankChannel.send({ content: `الاداري: <@${stafer.id}>`, embeds: [embedrank] });
                            await interaction.reply({ content: 'تم إرسال تقييمك بنجاح، نشكرك لاستعمال خدماتنا', ephemeral: true });
                        } else {
                            await interaction.reply({ content: 'حدث خطأ، روم التقييم غير موجود.', ephemeral: true });
                        }
                            await interaction.message.delete();

                        collector.stop();
                    });

                    collector.on('end', collected => {
                        if (collected.size === 0) {
                            message.channel.send('لم يتم تلقي أي تقييمات.');
                        }
                    });
                })
                .catch(error => {
                    console.error('Error collecting messages: ', error);
                    message.channel.send('انتهى الوقت، لا يمكنك التقييم.');
                });
        });
    }
});

client27.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const line = suggestionsDB.get(`line_${message?.guild?.id}`);
  const chan = suggestionsDB.get(`suggestions_room_${message?.guild?.id}`);
  const suggestionMode = suggestionsDB.get(`suggestion_mode_${message?.guild?.id}`) || 'buttons'; 
  const threadMode = suggestionsDB.get(`thread_mode_${message?.guild?.id}`) || 'enabled'; 

  if (chan) {
    if (message.channel.id !== chan) return;
    const embed = new EmbedBuilder()
      .setColor('Random')
      .setTimestamp()
      .setTitle(`** > ${message.content} **`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) });

    if (suggestionMode === 'buttons') {
      const button1 = new ButtonBuilder()
        .setCustomId(`ok_button`)
        .setLabel(`0`)
        .setEmoji("✔️")
        .setStyle(ButtonStyle.Success);
      const button2 = new ButtonBuilder()
        .setCustomId(`no_button`)
        .setLabel(`0`)
        .setEmoji("✖️")
        .setStyle(ButtonStyle.Danger);
      const row = new ActionRowBuilder().addComponents(button1, button2);
      let send = await message.channel.send({ embeds: [embed], components: [row] }).catch(() => { return; });

      if (threadMode === 'enabled') {
        await send.startThread({
          name: `Comments - تعليقات`
        }).then(async (thread) => {
          thread.send(`** - هذا المكان مخصص لمشاركة رايك حول هذا الاقتراح : \`${message.content}\` **`);
        });
      }

      if (line) {
        if (line.startsWith('http')) {
          await message.channel.send({ content: line }).catch((err) => { return; });
        } else {
          await message.channel.send({ files: [line] }).catch((err) => { return; });
        }
      }
      await suggestionsDB.set(`${send.id}_ok`, 0);
      await suggestionsDB.set(`${send.id}_no`, 0);
      return message.delete();
    } else if (suggestionMode === 'reactions') {
      let send = await message.channel.send({ embeds: [embed] }).catch(() => { return; });
      
      const customEmojis = suggestionsDB.get(`suggestions_auto_emojis_${message?.guild?.id}`);
      if (customEmojis && customEmojis.length > 0) {
        for (const emoji of customEmojis) {
          await send.react(emoji);
        }
      } else {
        await send.react('✔️');
        await send.react('❌');
      }

      if (threadMode === 'enabled') {
        await send.startThread({
          name: `Comments - تعليقات`
        }).then(async (thread) => {
          thread.send(`** - هذا المكان مخصص لمشاركة رايك حول هذا الاقتراح : \`${message.content}\` **`);
        });
      }

      if (line) {
        if (line.startsWith('http')) {
          await message.channel.send({ content: line }).catch((err) => { return; });
        } else {
          await message.channel.send({ files: [line] }).catch((err) => { return; });
        }
      }
      return message.delete();
    }
  }
});

client27.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  
  const line = feedbackDB.get(`line_${message?.guild?.id}`);
  const chan = feedbackDB.get(`feedback_room_${message?.guild?.id}`);
  const feedbackMode = feedbackDB.get(`feedback_mode_${message?.guild?.id}`) || 'embed'; 
  const feedbackEmoji = feedbackDB.get(`feedback_emoji_${message?.guild?.id}`) || "❤"; 

  if (chan) {
    if (message.channel.id !== chan) return;

    const embed = new EmbedBuilder()
      .setColor('Random')
      .setTimestamp()
      .setTitle(`** > ${message.content} **`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) });

    if (feedbackMode === 'embed') {
      await message.delete();
      const themsg = await message.channel.send({ content: `**<@${message?.author?.id}> شكرا لمشاركتنا رأيك :tulip:**`, embeds: [embed] });
      
      const customEmojis = feedbackDB.get(`feedback_auto_emojis_${message?.guild?.id}`);
      if (customEmojis && customEmojis.length > 0) {
        for (const emoji of customEmojis) {
          await themsg.react(emoji);
        }
      } else {
        await themsg.react("❤");
        await themsg.react("❤️‍🔥");
      }
      
      if (line) {
        await message.channel.send({ files: [line] });
      }
    } else if (feedbackMode === 'reactions') {
      const customEmojis = feedbackDB.get(`feedback_auto_emojis_${message?.guild?.id}`);
      if (customEmojis && customEmojis.length > 0) {
        for (const emoji of customEmojis) {
          await message.react(emoji);
        }
      } else {
        await message.react(feedbackEmoji);
      }
      
      if (line) {
        await message.channel.send({ files: [line] });
      }
    }
  }
});

client27.on('messageCreate', async message => {
    if (message.author.bot) return;
  if(message.content == `${prefix}close`) {
        const supportRoleID = ticketDB.get(`TICKET-PANEL_${message.channel.id}`)?.Support;

        const ticket = ticketDB.get(`TICKET-PANEL_${message.channel.id}`);

        await message.channel.permissionOverwrites.edit(ticket.author, { ViewChannel: false });

        const embed2 = new EmbedBuilder()
            .setDescription(`تم اغلاق تذكرة بواسطة ${message.author}`)
            .setColor("Yellow");

        const embed = new EmbedBuilder()
            .setDescription("```لوحة فريق الدعم.```")
            .setColor("DarkButNotBlack");

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('delete').setLabel('Delete').setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId('Open').setLabel('Open').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('Tran').setLabel('Transcript').setStyle(ButtonStyle.Secondary)
            );

        await message.reply({ embeds: [embed2, embed], components: [row] });

        const logsRoomId = ticketDB.get(`LogsRoom_${message?.guild?.id}`);
        const logChannel = message.guild.channels.cache.get(logsRoomId);

        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTitle('Close Ticket')
                .addFields(
                    { name: 'Name Ticket', value: `${message.channel.name}` },
                    { name: 'Owner Ticket', value: `${ticket.author}` },
                    { name: 'Closed By', value: `${message.author}` },
                )
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });

            logChannel.send({ embeds: [logEmbed] });
        }
    }
});

client27.on('messageCreate', async message => {
    const supportRoleId = ticketDB.get(`TICKET-PANEL_${message.channel.id}`)?.Support;
    if (message.author.bot) return;
  if(message.content == `${prefix}delete`) {
        if (!message.member.roles.cache.has(supportRoleId)) {
            message.reply({ content: ':x: Only Support', ephemeral: true });
            return;
        }

        if (!ticketDB.has(`TICKET-PANEL_${message.channel.id}`)) {
            message.reply({ content: 'This channel isn\'t a ticket', ephemeral: true });
            return;
        }
        const embed = new EmbedBuilder()
            .setColor('Red')
            .setDescription('Ticket will be deleted in a few seconds');
        await message.reply({ embeds: [embed] });

        setTimeout(() => {
            message.channel.delete();
        }, 4500);

        const Logs = ticketDB.get(`LogsRoom_${message?.guild?.id}`);
        const Log = message.guild.channels.cache.get(Logs);
        const Ticket = ticketDB.get(`TICKET-PANEL_${message.channel.id}`);
        const logEmbed = new EmbedBuilder()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTitle('Delete Ticket')
            .addFields(
                { name: 'Name Ticket', value: `${message.channel.name}` },
                { name: 'Owner Ticket', value: `${Ticket.author}` },
                { name: 'Deleted By', value: `${message.author}` },
            )
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });

        Log?.send({ embeds: [logEmbed] });
        ticketDB.delete(`TICKET-PANEL_${message.channel.id}`);
    }
});

client27.on('messageCreate', async message => {
const cmd = await shortcutDB.get(`say_cmd_${message?.guild?.id}`) || null;  
    if (message.author.bot) return;
    if (message.content.startsWith(`${prefix}say`) || message.content.startsWith(`${cmd}`)) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;
        const content = message.content.slice(`${prefix}say`.length).trim();
        if (!content) {
            message.channel.send("من فضلك اكتب شيئا بعد الأمر.");
            return;
        }
        let image = null;
        if (message.attachments.size > 0) {
            const attachment = message.attachments.first();
            image = attachment.url;
        }

        await message.delete();

        await message.channel.send({ 
            content: content, 
            files: image ? [image] : [] 
        });
    }
});

client27.on('messageCreate', async message => {
  const cmd = shortcutDB.get(`clear_cmd_${message?.guild?.id}`) || null;
    if (message.author.bot) return;
    if (message.content.startsWith(`${prefix}clear`) || message.content.startsWith(`${cmd}`)) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;
        const args = message.content.split(' ').slice(1);
        const amount = args[0] ? parseInt(args[0]) : 99;
        if (isNaN(amount) || amount <= 0 || amount > 100) return;
        try {
            const fetchedMessages = await message.channel.messages.fetch({ limit: amount });
            const messagesToDelete = fetchedMessages.filter(msg => {
                const fourteenDays = 14 * 24 * 60 * 60 * 1000;
                return (Date.now() - msg.createdTimestamp) < fourteenDays;
            });
            await message.channel.bulkDelete(messagesToDelete);
        } catch (error) {
        }
    }
});

client27.on('messageCreate', async message => {
const cmd = await shortcutDB.get(`tax_cmd_${message?.guild?.id}`) || null; 
    if (message.content.startsWith(`${prefix}tax`) || message.content.startsWith(`${cmd}`)) {
        const args = message.content.startsWith(`${prefix}tax`) 
            ? message.content.slice(`${prefix}tax`.length).trim() 
            : message.content.slice(`${cmd}`.length).trim();

        let number = args;
        if (number.endsWith("k")) number = number.replace(/k/gi, "") * 1000;
        else if (number.endsWith("K")) number = number.replace(/K/gi, "") * 1000;
        else if (number.endsWith("m")) number = number.replace(/m/gi, "") * 1000000;
        else if (number.endsWith("M")) number = number.replace(/M/gi, "") * 1000000;

        let number2 = parseFloat(number);

        if (isNaN(number2)) {
            return message.reply('يرجى إدخال رقم صحيح بعد الأمر');
        }

        let tax = Math.floor(number2 * (20) / (19) + 1); 
        let tax2 = Math.floor(tax - number2); 

        await message.reply(`${tax}`);
    }
});

client27.on('messageCreate', async message => {
const cmd = await shortcutDB.get(`come_cmd_${message?.guild?.id}`) || null;  
    if (message.content.startsWith(`${prefix}come`) || message.content.startsWith(`${cmd}`)) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('يجب أن تملك صلاحية إدارة الرسائل (MANAGE_MESSAGES).');
        }
        const mentionOrID = message.content.split(/\s+/)[1];
        const targetMember = message.mentions.members.first() || message.guild.members.cache.get(mentionOrID);
        if (!targetMember) {
            return message.reply('من فضلك قم بعمل منشن لشخص أو ضع الإيدي.');
        }
        const directMessageContent = `**تم استدعائك بواسطة : ${message.author}\nفي : ${message.channel}**`;
        try {
            await targetMember.send(directMessageContent);
            await message.reply('**تم الارسال للشخص بنجاح**');
        } catch (error) {
            await message.reply('**لم استطع الارسال للشخص**');
        }
    }
});

client27.on("messageCreate", async (message) => {
const cmd = await shortcutDB.get(`lock_cmd_${message?.guild?.id}`) || null;  
  if (message.content === `${prefix}lock` || message.content === `${cmd}`) {
    try {
      if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
        return message.reply({ content: `**لا تمتلك صلاحية لفعل ذلك**` });
            }
      await message.channel.permissionOverwrites.edit(
        message.channel.guild.roles.everyone, 
        { SendMessages: false }
      );
      
      return message.reply({ content: `**${message.channel} has been locked**` });
    } catch (error) {
      message.reply({ content: `لقد حدث خطأ، اتصل بالمطورين.` });
      console.log(error);
    }
  }
});

client27.on("messageCreate", async (message) => {
const cmd = await shortcutDB.get(`unlock_cmd_${message?.guild?.id}`) || null;  
  if (message.content === `${prefix}unlock` || message.content === `${cmd}`) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return message.reply({ content: `**لا تمتلك صلاحية لفعل ذلك**` });
    }
      await message.channel.permissionOverwrites.edit(
      message.channel.guild.roles.everyone, 
      { SendMessages: true }
    );
    return message.reply({ content: `**${message.channel} has been unlocked**` });
  }
});

client27.on("messageCreate", async (message) => {
const cmd = await shortcutDB.get(`hide_cmd_${message?.guild?.id}`) || null;  
  if (message.content === `${prefix}hide` || message.content === `${cmd}`) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return message.reply({ content: `**لا تمتلك صلاحية لفعل ذلك**` });
    }
      await message.channel.permissionOverwrites.edit(
      message.channel.guild.roles.everyone, 
      { ViewChannel: false }
    );
    return message.reply({ content: `**${message.channel} has been hidden**` });
  }
});

client27.on("messageCreate", async (message) => {
const cmd = await shortcutDB.get(`unhide_cmd_${message?.guild?.id}`) || null;  
  if (message.content === `${prefix}unhide` || message.content === `${cmd}`) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return message.reply({ content: `**لا تمتلك صلاحية لفعل ذلك**` });
    }
      await message.channel.permissionOverwrites.edit(
      message.channel.guild.roles.everyone, 
      { ViewChannel: true }
    );
    return message.reply({ content: `**${message.channel} has been unhidden**` });
  }
});

client27.on("messageCreate", async (message) => {
const cmd = await shortcutDB.get(`server_cmd_${message?.guild?.id}`) || null;
  if (message.content === `${prefix}server` || message.content === `${cmd}`) {
    const embedser = new EmbedBuilder()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setColor('Random')
      .addFields(
        {
          name: `**🆔 Server ID:**`, 
          value: message?.guild?.id, 
          inline: false
        },
        {
          name: `**📆 Created On:**`, 
          value: `**<t:${parseInt(message.guild.createdTimestamp / 1000)}:R>**`, 
          inline: false
        },
        {
          name: `**👑 Owned By:**`, 
          value: `**<@${message.guild.ownerId}>**`, 
          inline: false
        },
        {
          name: `**👥 Members (${message.guild.memberCount})**`, 
          value: `**${message.guild.premiumSubscriptionCount} Boosts ✨**`, 
          inline: false
        },
        {
          name: `**💬 Channels (${message.guild.channels.cache.size})**`, 
          value: `**${message.guild.channels.cache.filter(r => r.type === ChannelType.GuildText).size}** Text | **${
              message.guild.channels.cache.filter(r => r.type === ChannelType.GuildVoice).size
            }** Voice | **${message.guild.channels.cache.filter(r => r.type === ChannelType.GuildCategory).size}** Category`,
          inline: false
        },
        {
          name: '🌍 Others',
          value: `**Verification Level:** ${message.guild.verificationLevel}`,
          inline: false
        }
      )
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
    return message.reply({ embeds: [embedser] });
  }
});

client27.on("guildMemberAdd" , async(member) => {
  if(protectDB.has(`antibots_status_${member.guild.id}`)) {
    let antibotsstatus = protectDB.get(`antibots_status_${member.guild.id}`)
    if(antibotsstatus == "on") {
      if(member.user.bot) {
        try {
          const logRoom = await protectDB.get(`protectLog_room_${member.guild.id}`)
          if(logRoom){
            const theLogRoom = await member.guild.channels.cache.find((ch) => ch.id == logRoom);
            theLogRoom.send({embeds : [new EmbedBuilder().setTitle('نظام الحماية').addFields({name : `العضو :` , value : `${member.user.username} \`${member.id}\``} , {name : `السبب :` , value : `نظام الحماية من البوتات`} , {name : `العقاب :` , value : `طرد البوت`})]})
          }
          member.kick()
        } catch(err){
          return console.log('error' , err);
        }
      }
    }
  }
})

client27.on(Events.ClientReady , async() => {
  const guild = client27.guilds.cache.first()
  if(!guild) return;
  const guildid = guild.id
  let status = protectDB.get(`antideleterooms_status_${guildid}`)
  if(!status)return;
  if(status == "off") return;
  setInterval(() => {
  const users = protectDB.get(`roomsdelete_users_${guildid}`)
    if(!users) return;
    if(users.length > 0) {
      users.forEach(async(user) => {
        const { userid , limit , newReset } = user;
        const currentTime = moment().format('YYYY-MM-DD');
        if(moment(currentTime).isSame(newReset) || moment(currentTime).isAfter(newReset)) {
          const newResetDate = moment().add(1 , 'day').format('YYYY-MM-DD')
          executordb = {userid:userid,limit:0,newReset:newResetDate}
          const index = users.findIndex(user => user.userid === userid);
      users[index] = executordb;
      await protectDB.set(`roomsdelete_users_${guildid}` , users)
        }
        let limitrooms = protectDB.get(`antideleterooms_limit_${guildid}`)
      if(limit > limitrooms) {
        let member = guild.members.cache.find(m => m.id == userid)
       try {
         member.kick()
       } catch  {
        return;
       }
      }
      })
      
    } 
  }, 6 * 1000);
})

client27.on('channelDelete' , async(channel) => {
  let guildid = channel.guild.id
  let status = protectDB.get(`antideleterooms_status_${guildid}`)
  if(!status)return;
  if(status == "off") return;
  const fetchedLogs = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.ChannelDelete
  });
  const channelDeleteLog = fetchedLogs.entries.first();
  if(!channelDeleteLog) return;
  const { executor } = channelDeleteLog;
  const users = protectDB.get(`roomsdelete_users_${guildid}`) || []
  const endTime = moment().add(1 , 'day').format('YYYY-MM-DD')
  if(users.length <= 0) {
    await protectDB.push(`roomsdelete_users_${guildid}` , {userid:executor.id , limit:1 , newReset:endTime})
    return;
  }
  let executordb = users.find(user => user.userid == executor.id)
  if(!executordb) {
      await protectDB.push(`roomsdelete_users_${guildid}` , {userid:executor.id , limit:1 , newReset:endTime})
      return;
  }
  let oldexecutorlimit = executordb.limit
  let newexecutorlimit = oldexecutorlimit + 1
  executordb = {userid:executor.id,limit:newexecutorlimit,newReset:endTime}
  const index = users.findIndex(user => user.userid === executor.id);
users[index] = executordb;
  let deletelimit = protectDB.get(`antideleterooms_limit_${guildid}`)
  if(newexecutorlimit > deletelimit) {
    let guild = client27.guilds.cache.find(gu => gu.id == guildid)
    let member = guild.members.cache.find(ex => ex.id == executor.id)
   try {
    const logRoom = await protectDB.get(`protectLog_room_${member.guild.id}`)
    if(logRoom){
      const theLogRoom = await member.guild.channels.cache.find((ch) => ch.id == logRoom);
      theLogRoom.send({embeds : [new EmbedBuilder().setTitle('نظام الحماية').addFields({name : `العضو :` , value : `${member.user.username} \`${member.id}\``} , {name : `السبب :` , value : `حذف رومات`} , {name : `العقاب :` , value : `طرد العضو`})]})
    }
    member.kick()
   } catch  {
    return;
   }
    let filtered = users.filter(a => a.userid != executor.id)
    await protectDB.set(`roomsdelete_users_${guildid}` , filtered)
  } else {
    await protectDB.set(`roomsdelete_users_${guildid}` , users)
  }
})

client27.on(Events.ClientReady , async() => {
  const guild = client27.guilds.cache.first()
  if(!guild) return;
  const guildid = guild.id
  let status = protectDB.get(`antideleteroles_status_${guildid}`)
  if(!status)return;
  if(status == "off") return;
  setInterval(() => {
  const users = protectDB.get(`rolesdelete_users_${guildid}`)
    if(!users) return;
    if(users.length > 0) {
      users.forEach(async(user) => {
        const { userid , limit , newReset } = user;
        const currentTime = moment().format('YYYY-MM-DD');
        if(moment(currentTime).isSame(newReset) || moment(currentTime).isAfter(newReset)) {
          const newResetDate = moment().add(1 , 'day').format('YYYY-MM-DD')
          executordb = {userid:userid,limit:0,newReset:newResetDate}
          const index = users.findIndex(user => user.userid === userid);
      users[index] = executordb;
      await protectDB.set(`rolesdelete_users_${guildid}` , users)
        }
        let limitrooms = protectDB.get(`antideleteroles_limit_${guildid}`)
      if(limit > limitrooms) {
        let member = guild.members.cache.find(m => m.id == userid)
       try {
         member.kick()
       } catch  {
        return;
       }
      }
      })
      
    } 
  }, 6 * 1000);
})

client27.on('roleDelete' , async(role) => {
  let guildid = role.guild.id
  let status = protectDB.get(`antideleteroles_status_${guildid}`)
  if(!status)return;
  if(status == "off") return;
  const fetchedLogs = await role.guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.RoleDelete
  });
  const roleDeleteLog = fetchedLogs.entries.first();
  if(!roleDeleteLog) return;
  const { executor } = roleDeleteLog;
  const users = protectDB.get(`rolesdelete_users_${guildid}`) || []
  const endTime = moment().add(1 , 'day').format('YYYY-MM-DD')
  if(users.length <= 0) {
    await protectDB.push(`rolesdelete_users_${guildid}` , {userid:executor.id , limit:1 , newReset:endTime})
    return;
  }
  let executordb = users.find(user => user.userid == executor.id)
  if(!executordb) {
      await protectDB.push(`rolesdelete_users_${guildid}` , {userid:executor.id , limit:1 , newReset:endTime})
      return;
  }
  let oldexecutorlimit = executordb.limit
  let newexecutorlimit = oldexecutorlimit + 1
  executordb = {userid:executor.id,limit:newexecutorlimit,newReset:endTime}
  const index = users.findIndex(user => user.userid === executor.id);
users[index] = executordb;
  let deletelimit = protectDB.get(`antideleteroles_limit_${guildid}`)
  if(newexecutorlimit > deletelimit) {
    let guild = client27.guilds.cache.find(gu => gu.id == guildid)
    let member = guild.members.cache.find(ex => ex.id == executor.id)
   try {
    const logRoom = await protectDB.get(`protectLog_room_${member.guild.id}`)
    if(logRoom){
      const theLogRoom = await member.guild.channels.cache.find((ch) => ch.id == logRoom);
      theLogRoom.send({embeds : [new EmbedBuilder().setTitle('نظام الحماية').addFields({name : `العضو :` , value : `${member.user.username} \`${member.id}\``} , {name : `السبب :` , value : `حذف رتب`} , {name : `العقاب :` , value : `طرد العضو`})]})
    }
    member.kick()
   } catch  {
    return;
   }
    let filtered = users.filter(a => a.userid != executor.id)
    await protectDB.set(`rolesdelete_users_${guildid}` , filtered)
  } else {
    await protectDB.set(`rolesdelete_users_${guildid}` , users)
  }
})

client27.on(Events.ClientReady , async() => {
  const guild = client27.guilds.cache.first()
  if(!guild) return;
  const guildid = guild.id
  let status = protectDB.get(`ban_status_${guildid}`)
  if(!status)return;
  if(status == "off") return;
  setInterval(() => {
  const users = protectDB.get(`ban_users_${guildid}`)
    if(!users) return;
    if(users.length > 0) {
      users.forEach(async(user) => {
        const { userid , limit , newReset } = user;
        const currentTime = moment().format('YYYY-MM-DD');
        if(moment(currentTime).isSame(newReset) || moment(currentTime).isAfter(newReset)) {
          const newResetDate = moment().add(1 , 'day').format('YYYY-MM-DD')
          executordb = {userid:userid,limit:0,newReset:newResetDate}
          const index = users.findIndex(user => user.userid === userid);
      users[index] = executordb;
      await protectDB.set(`ban_users_${guildid}` , users)
        }
        let limitrooms = protectDB.get(`ban_limit_${guildid}`)
      if(limit > limitrooms) {
        let member = guild.members.cache.find(m => m.id == userid)
       try {
         member.kick()
       } catch  {
        return;
       }
      }
      })
      
    } 
  }, 6 * 1000);
})

client27.on('guildBanAdd' , async(member) => {
  let guildid = member.guild.id
  let status = protectDB.get(`ban_status_${guildid}`)
  if(!status)return;
  if(status == "off") return;
  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.MemberBanAdd
  });
  const banAddLog = fetchedLogs.entries.first();
  if(!banAddLog) return;
  const { executor } = banAddLog;
  const users = protectDB.get(`ban_users_${guildid}`) || []
  const endTime = moment().add(1 , 'day').format('YYYY-MM-DD')
  if(users.length <= 0) {
    await protectDB.push(`ban_users_${guildid}` , {userid:executor.id , limit:1 , newReset:endTime})
    return;
  }
  let executordb = users.find(user => user.userid == executor.id)
  if(!executordb) {
      await protectDB.push(`ban_users_${guildid}` , {userid:executor.id , limit:1 , newReset:endTime})
      return;
  }
  let oldexecutorlimit = executordb.limit
  let newexecutorlimit = oldexecutorlimit + 1
  executordb = {userid:executor.id,limit:newexecutorlimit,newReset:endTime}
  const index = users.findIndex(user => user.userid === executor.id);
users[index] = executordb;
  let deletelimit = protectDB.get(`ban_limit_${guildid}`)
  if(newexecutorlimit > deletelimit) {
    let guild = client27.guilds.cache.find(gu => gu.id == guildid)
    let member = guild.members.cache.find(ex => ex.id == executor.id)
   try {
    const logRoom = await protectDB.get(`protectLog_room_${member.guild.id}`)
    if(logRoom){
      const theLogRoom = await member.guild.channels.cache.find((ch) => ch.id == logRoom);
      theLogRoom.send({embeds : [new EmbedBuilder().setTitle('نظام الحماية').addFields({name : `العضو :` , value : `${member.user.username} \`${member.id}\``} , {name : `السبب :` , value : `حظر اعضاء`} , {name : `العقاب :` , value : `طرد العضو`})]})
    }
    member.kick()
   } catch  {
    return;
   }
    let filtered = users.filter(a => a.userid != executor.id)
    await protectDB.set(`ban_users_${guildid}` , filtered)
  } else {
    await protectDB.set(`ban_users_${guildid}` , users)
  }
})

client27.on('guildMemberRemove' , async(member) => {
  let guildid = member.guild.id
  let status = protectDB.get(`ban_status_${guildid}`)
  if(!status)return;
  if(status == "off") return;
  if(member.id === client27.user.id) return;
  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.MemberKick
  });
  const kickLog = fetchedLogs.entries.first();
  if(!kickLog) return;
  const { executor } = kickLog;
  const users = protectDB.get(`ban_users_${guildid}`) || []
  const endTime = moment().add(1 , 'day').format('YYYY-MM-DD')
  if(users.length <= 0) {
    await protectDB.push(`ban_users_${guildid}` , {userid:executor.id , limit:1 , newReset:endTime})
    return;
  }
  let executordb = users.find(user => user.userid == executor.id)
  if(!executordb) {
      await protectDB.push(`ban_users_${guildid}` , {userid:executor.id , limit:1 , newReset:endTime})
      return;
  }
  let oldexecutorlimit = executordb.limit
  let newexecutorlimit = oldexecutorlimit + 1
  executordb = {userid:executor.id,limit:newexecutorlimit,newReset:endTime}
  const index = users.findIndex(user => user.userid === executor.id);
users[index] = executordb;
  let deletelimit = protectDB.get(`ban_limit_${guildid}`)
  if(newexecutorlimit > deletelimit) {
    let guild = client27.guilds.cache.find(gu => gu.id == guildid)
    let member = guild.members.cache.find(ex => ex.id == executor.id)
   try {
    const logRoom = await protectDB.get(`protectLog_room_${member.guild.id}`)
    if(logRoom){
      const theLogRoom = await member.guild.channels.cache.find((ch) => ch.id == logRoom);
      theLogRoom.send({embeds : [new EmbedBuilder().setTitle('نظام الحماية').addFields({name : `العضو :` , value : `${member.user.username} \`${member.id}\``} , {name : `السبب :` , value : `طرد اعضاء`} , {name : `العقاب :` , value : `طرد العضو`})]})
    }
    member.kick()
   } catch  {
    return;
   }
    let filtered = users.filter(a => a.userid != executor.id)
    await protectDB.set(`ban_users_${guildid}` , filtered)
  } else {
    await protectDB.set(`ban_users_${guildid}` , users)
  }
})

client27.on('messageDelete' , async(message) => {
  if(!message) return;
  if(!message.author) return;
  if(message.author.bot) return;
if (!logsDB.has(`log_messagedelete_${message?.guild?.id}`)) return;
let deletelog1 = logsDB.get(`log_messagedelete_${message?.guild?.id}`)
  let deletelog2 = message.guild.channels.cache.get(deletelog1)
  const fetchedLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.MessageDelete
  });
  const deletionLog = fetchedLogs.entries.first();
  const executor = deletionLog?.executor || message.author;
  const target = deletionLog?.target || message.author;
let deleteembed = new EmbedBuilder()
.setColor('#e74c3c')
.setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
.setTitle(`🗑️ تم حذف رسالة`)
    .addFields(
      {
        name: `👤 صاحب الرسالة`, value: `${message.author} - \`${message?.author?.id}\``, inline: true
      },
      {
        name: `🔨 حاذف الرسالة`, value: `${executor} - \`${executor.id}\``, inline: true
      },
      {
        name: `📍 القناة`, value: `${message.channel}`, inline: true
      },
      {
        name: `📝 محتوى الرسالة`, value: message.content ? `\`\`\`${message.content.substring(0, 1000)}\`\`\`` : '`لا يوجد محتوى نصي`', inline: false
      },
      {
        name: `🆔 معرف الرسالة`, value: `\`${message.id}\``, inline: true
      },
      {
        name: `🕒 وقت الحذف`, value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true
      }
    )
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setTimestamp();
  await deletelog2.send({ embeds: [deleteembed] })
})
client27.on('messageUpdate' , async(oldMessage, newMessage) => {
if(!oldMessage.author) return;
if(oldMessage.author.bot) return;
if (!logsDB.has(`log_messageupdate_${oldMessage.guild.id}`)) return;
if(oldMessage.content === newMessage.content) return;
let updateLog1 = logsDB.get(`log_messageupdate_${oldMessage.guild.id}`);
  let updateLog2 = oldMessage.guild.channels.cache.get(updateLog1); 
let updateEmbed = new EmbedBuilder()
.setColor('#3498db')
.setAuthor({ name: `${oldMessage.author.tag}`, iconURL: oldMessage.author.displayAvatarURL({ dynamic: true }) })
.setTitle(`✏️ تم تعديل رسالة`)
.addFields(
{
  name: "👤 صاحب الرسالة",
  value: `${oldMessage.author} - \`${oldMessage.author.id}\``,
  inline: true
},
{
  name: "📍 القناة",
  value: `${oldMessage.channel}`,
  inline: true
},
{
  name: "🔗 رابط الرسالة",
  value: `[اذهب للرسالة](https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})`,
  inline: true
},
{
  name: "📝 المحتوى القديم",
  value: oldMessage.content ? `\`\`\`${oldMessage.content.substring(0, 1000)}\`\`\`` : '`لا يوجد محتوى نصي`',
  inline: false
},
{
  name: "✨ المحتوى الجديد",
  value: newMessage.content ? `\`\`\`${newMessage.content.substring(0, 1000)}\`\`\`` : '`لا يوجد محتوى نصي`',
  inline: false
},
{
  name: "🕒 وقت التعديل",
  value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
  inline: true
}
)
.setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
.setFooter({ text: `${oldMessage.guild.name}`, iconURL: oldMessage.guild.iconURL({ dynamic: true }) })
.setTimestamp()
await updateLog2.send({ embeds: [updateEmbed] });
})
client27.on('roleCreate' , async(role) => {
if (!logsDB.has(`log_rolecreate_${role.guild.id}`)) return;
let roleCreateLog1 = logsDB.get(`log_rolecreate_${role.guild.id}`);
  let roleCreateLog2 = role.guild.channels.cache.get(roleCreateLog1);
  const fetchedLogs = await role.guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.RoleCreate
  });
  const roleCreateLog = fetchedLogs.entries.first();
  if(!roleCreateLog) return;
  const { executor } = roleCreateLog;
  let roleCreateEmbed = new EmbedBuilder()
    .setColor('#2ecc71')
    .setAuthor({ name: `${executor.tag}`, iconURL: executor.displayAvatarURL({ dynamic: true }) })
    .setTitle('➕ تم إنشاء رتبة جديدة')
    .addFields(
      { name: '🎭 اسم الرتبة', value: `${role}`, inline: true },
      { name: '🆔 معرف الرتبة', value: `\`${role.id}\``, inline: true },
      { name: '🎨 لون الرتبة', value: role.hexColor !== '#000000' ? `\`${role.hexColor}\`` : '`بدون لون`', inline: true },
      { name: '👤 تم الإنشاء بواسطة', value: `${executor} - \`${executor.id}\``, inline: true },
      { name: '📊 موضع الرتبة', value: `\`${role.position}\``, inline: true },
      { name: '🕒 وقت الإنشاء', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
    )
    .setThumbnail(executor.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `${role.guild.name}`, iconURL: role.guild.iconURL({ dynamic: true }) })
    .setTimestamp();
  await roleCreateLog2.send({ embeds: [roleCreateEmbed] });
})
client27.on('roleDelete' , async(role) => {
if (!logsDB.has(`log_roledelete_${role.guild.id}`)) return;
let roleDeleteLog1 = logsDB.get(`log_roledelete_${role.guild.id}`);
  let roleDeleteLog2 = role.guild.channels.cache.get(roleDeleteLog1);
  const fetchedLogs = await role.guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.RoleDelete
  });

  const roleDeleteLog = fetchedLogs.entries.first();
  if(!roleDeleteLog) return;
  const { executor } = roleDeleteLog;

  let roleDeleteEmbed = new EmbedBuilder()
    .setColor('#e74c3c')
    .setAuthor({ name: `${executor.tag}`, iconURL: executor.displayAvatarURL({ dynamic: true }) })
    .setTitle('🗑️ تم حذف رتبة')
    .addFields(
      {name:'🎭 اسم الرتبة', value:`\`${role.name}\``, inline:true},
      {name:'🆔 معرف الرتبة', value:`\`${role.id}\``, inline:true},
      {name:'🎨 لون الرتبة', value: role.hexColor !== '#000000' ? `\`${role.hexColor}\`` : '`بدون لون`', inline:true},
      {name:'👤 تم الحذف بواسطة', value:`${executor} - \`${executor.id}\``, inline:true},
      {name:'📊 موضع الرتبة', value:`\`${role.position}\``, inline:true},
      {name:'🕒 وقت الحذف', value:`<t:${Math.floor(Date.now() / 1000)}:F>`, inline:true}
    )
    .setThumbnail(executor.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `${role.guild.name}`, iconURL: role.guild.iconURL({ dynamic: true }) })
    .setTimestamp();

  await roleDeleteLog2.send({ embeds: [roleDeleteEmbed] });
})

client27.on('channelCreate', async (channel) => {
if (logsDB.has(`log_channelcreate_${channel.guild.id}`)) {
let channelCreateLog1 = logsDB.get(`log_channelcreate_${channel.guild.id}`);
let channelCreateLog2 = channel.guild.channels.cache.get(channelCreateLog1);

const fetchedLogs = await channel.guild.fetchAuditLogs({
  limit: 1,
  type: AuditLogEvent.ChannelCreate
});

const channelCreateLog = fetchedLogs.entries.first();
if(!channelCreateLog) return;
const { executor } = channelCreateLog;

let channelCategory = channel.parent ? channel.parent.name : 'لا يوجد';
const channelTypes = {
  0: '💬 نصية',
  2: '🔊 صوتية',
  4: '📁 فئة',
  5: '📰 إعلانات',
  13: '🎭 مسرح',
  15: '🧵 منتدى'
};
let channelType = channelTypes[channel.type] || 'غير معروف';

let channelCreateEmbed = new EmbedBuilder()
  .setColor('#2ecc71')
  .setAuthor({ name: `${executor.tag}`, iconURL: executor.displayAvatarURL({ dynamic: true }) })
  .setTitle('➕ تم إنشاء قناة جديدة')
  .addFields(
    { name: '📢 اسم القناة', value: `${channel}`, inline: true },
    { name: '🆔 معرف القناة', value: `\`${channel.id}\``, inline: true },
    { name: '📋 نوع القناة', value: channelType, inline: true },
    { name: '📁 الفئة', value: `\`${channelCategory}\``, inline: true },
    { name: '👤 تم الإنشاء بواسطة', value: `${executor} - \`${executor.id}\``, inline: true },
    { name: '🕒 وقت الإنشاء', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
  )
  .setThumbnail(executor.displayAvatarURL({ dynamic: true }))
  .setFooter({ text: `${channel.guild.name}`, iconURL: channel.guild.iconURL({ dynamic: true }) })
  .setTimestamp();

await channelCreateLog2.send({ embeds: [channelCreateEmbed] });
}
});

client27.on('channelDelete', async (channel) => {
if (logsDB.has(`log_channeldelete_${channel.guild.id}`)) {
let channelDeleteLog1 = logsDB.get(`log_channeldelete_${channel.guild.id}`);
let channelDeleteLog2 = channel.guild.channels.cache.get(channelDeleteLog1);

const fetchedLogs = await channel.guild.fetchAuditLogs({
  limit: 1,
  type: AuditLogEvent.ChannelDelete
});

const channelDeleteLog = fetchedLogs.entries.first();
if(!channelDeleteLog) return;
const { executor } = channelDeleteLog;

let channelCategory = channel.parent ? channel.parent.name : 'لا يوجد';
const channelTypes = {
  0: '💬 نصية',
  2: '🔊 صوتية',
  4: '📁 فئة',
  5: '📰 إعلانات',
  13: '🎭 مسرح',
  15: '🧵 منتدى'
};
let channelType = channelTypes[channel.type] || 'غير معروف';

let channelDeleteEmbed = new EmbedBuilder()
  .setColor('#e74c3c')
  .setAuthor({ name: `${executor.tag}`, iconURL: executor.displayAvatarURL({ dynamic: true }) })
  .setTitle('🗑️ تم حذف قناة')
  .addFields(
    { name: '📢 اسم القناة', value: `\`${channel.name}\``, inline: true },
    { name: '🆔 معرف القناة', value: `\`${channel.id}\``, inline: true },
    { name: '📋 نوع القناة', value: channelType, inline: true },
    { name: '📁 الفئة', value: `\`${channelCategory}\``, inline: true },
    { name: '👤 تم الحذف بواسطة', value: `${executor} - \`${executor.id}\``, inline: true },
    { name: '🕒 وقت الحذف', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
  )
  .setThumbnail(executor.displayAvatarURL({ dynamic: true }))
  .setFooter({ text: `${channel.guild.name}`, iconURL: channel.guild.iconURL({ dynamic: true }) })
  .setTimestamp();

await channelDeleteLog2.send({ embeds: [channelDeleteEmbed] });
}
});

client27.on('guildMemberUpdate', async (oldMember, newMember) => {
const guild = oldMember.guild;
const addedRoles = newMember.roles.cache.filter((role) => !oldMember.roles.cache.has(role.id));
const removedRoles = oldMember.roles.cache.filter((role) => !newMember.roles.cache.has(role.id));

if (addedRoles.size > 0 && logsDB.has(`log_rolegive_${guild.id}`)) {
let roleGiveLog1 = logsDB.get(`log_rolegive_${guild.id}`);
let roleGiveLog2 = guild.channels.cache.get(roleGiveLog1);

const fetchedLogs = await guild.fetchAuditLogs({
  limit: addedRoles.size,
  type: AuditLogEvent.MemberRoleUpdate
});

addedRoles.forEach((role) => {
  const roleGiveLog = fetchedLogs.entries.find((log) => log.target.id === newMember.id && log.changes[0].new[0].id === role.id);
  const roleGiver = roleGiveLog ? roleGiveLog.executor : null;
  const roleGiverUsername = roleGiver ? `${roleGiver.username} (${roleGiver.id})` : `UNKNOWN`;

  let roleGiveEmbed = new EmbedBuilder()
    .setColor('#9b59b6')
    .setAuthor({ name: roleGiver ? roleGiver.tag : 'Unknown', iconURL: roleGiver ? roleGiver.displayAvatarURL({ dynamic: true }) : guild.iconURL({ dynamic: true }) })
    .setTitle('➕ تم إعطاء رتبة لعضو')
    .addFields(
      { name: '🎭 اسم الرتبة', value: `${role}`, inline: true },
      { name: '🆔 معرف الرتبة', value: `\`${role.id}\``, inline: true },
      { name: '🎨 لون الرتبة', value: role.hexColor !== '#000000' ? `\`${role.hexColor}\`` : '`بدون لون`', inline: true },
      { name: '👤 تم الإعطاء بواسطة', value: roleGiver ? `${roleGiver} - \`${roleGiver.id}\`` : '`غير معروف`', inline: true },
      { name: '👥 تم الإعطاء للعضو', value: `${newMember} - \`${newMember.id}\``, inline: true },
      { name: '🕒 وقت الإعطاء', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
    )
    .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) })
    .setTimestamp();

  roleGiveLog2.send({ embeds: [roleGiveEmbed] });
});
}

if (removedRoles.size > 0 && logsDB.has(`log_roleremove_${guild.id}`)) {
let roleRemoveLog1 = logsDB.get(`log_roleremove_${guild.id}`);
let roleRemoveLog2 = guild.channels.cache.get(roleRemoveLog1);

const fetchedLogs = await guild.fetchAuditLogs({
  limit: removedRoles.size,
  type: AuditLogEvent.MemberRoleUpdate
});

removedRoles.forEach((role) => {
  const roleRemoveLog = fetchedLogs.entries.find((log) => log.target.id === newMember.id && log.changes[0].new[0].id === role.id);
  const roleRemover = roleRemoveLog ? roleRemoveLog.executor : null;
  const roleRemoverUsername = roleRemover ? `${roleRemover.username} (${roleRemover.id})` : `UNKNOWN`;

  let roleRemoveEmbed = new EmbedBuilder()
    .setColor('#e67e22')
    .setAuthor({ name: roleRemover ? roleRemover.tag : 'Unknown', iconURL: roleRemover ? roleRemover.displayAvatarURL({ dynamic: true }) : guild.iconURL({ dynamic: true }) })
    .setTitle('➖ تم إزالة رتبة من عضو')
    .addFields(
      { name: '🎭 اسم الرتبة', value: `\`${role.name}\``, inline: true },
      { name: '🆔 معرف الرتبة', value: `\`${role.id}\``, inline: true },
      { name: '🎨 لون الرتبة', value: role.hexColor !== '#000000' ? `\`${role.hexColor}\`` : '`بدون لون`', inline: true },
      { name: '👤 تم الإزالة بواسطة', value: roleRemover ? `${roleRemover} - \`${roleRemover.id}\`` : '`غير معروف`', inline: true },
      { name: '👥 تم الإزالة من العضو', value: `${newMember} - \`${newMember.id}\``, inline: true },
      { name: '🕒 وقت الإزالة', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
    )
    .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) })
    .setTimestamp();

  roleRemoveLog2.send({ embeds: [roleRemoveEmbed] });
});
}
});
client27.on('guildMemberAdd', async (member) => {
const guild = member.guild;
if(!member.bot) return;
const fetchedLogs = await guild.fetchAuditLogs({
limit: 1,
type: AuditLogEvent.BotAdd
});

const botAddLog = fetchedLogs.entries.first();
if(!botAddLog) return;
const { executor, target } = botAddLog;

if (target.bot) {
let botAddLog1 = logsDB.get(`log_botadd_${guild.id}`);
if(!botAddLog1) return;
let botAddLog2 = guild.channels.cache.get(botAddLog1);

let botAddEmbed = new EmbedBuilder()
  .setColor('#ff9800')
  .setAuthor({ name: `${executor.tag}`, iconURL: executor.displayAvatarURL({ dynamic: true }) })
  .setTitle('🤖 تم إضافة بوت جديد للسيرفر')
  .addFields(
    { name: '🤖 اسم البوت', value: `${member}`, inline: true },
    { name: '🆔 معرف البوت', value: `\`${member.id}\``, inline: true },
    { name: '⚠️ صلاحية الأدمن', value: member.permissions.has('Administrator') ? '`✅ نعم لديه`' : '`❌ لا ليس لديه`', inline: true },
    { name: '👤 تم الإضافة بواسطة', value: `${executor} - \`${executor.id}\``, inline: true },
    { name: '🔗 رابط دعوة البوت', value: `[دعوة البوت](https://discord.com/api/oauth2/authorize?client_id=${member.id}&permissions=0&scope=bot)`, inline: true },
    { name: '🕒 وقت الإضافة', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
  )
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) })
  .setTimestamp();

botAddLog2.send({ embeds: [botAddEmbed] });
}
});

client27.on('guildBanAdd', async (guild, user) => {
if (logsDB.has(`log_banadd_${guild.id}`)) {
let banAddLog1 = logsDB.get(`log_banadd_${guild.id}`);
let banAddLog2 = guild.channels.cache.get(banAddLog1);

const fetchedLogs = await guild.fetchAuditLogs({
  limit: 1,
  type: AuditLogEvent.MemberBanAdd
});

const banAddLog = fetchedLogs.entries.first();
const banner = banAddLog ? banAddLog.executor : null;
const banReason = banAddLog ? banAddLog.reason : null;

let banAddEmbed = new EmbedBuilder()
  .setColor('#e74c3c')
  .setAuthor({ name: banner ? banner.tag : 'Unknown', iconURL: banner ? banner.displayAvatarURL({ dynamic: true }) : guild.iconURL({ dynamic: true }) })
  .setTitle('🔨 تم حظر عضو')
  .addFields(
    { name: '👤 العضو المحظور', value: `${user} - \`${user.id}\``, inline: true },
    { name: '🔨 تم الحظر بواسطة', value: banner ? `${banner} - \`${banner.id}\`` : '`غير معروف`', inline: true },
    { name: '📝 السبب', value: banReason ? `\`\`\`${banReason}\`\`\`` : '`لا يوجد سبب`', inline: false },
    { name: '🕒 وقت الحظر', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
  )
  .setThumbnail(user.displayAvatarURL({ dynamic: true }))
  .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) })
  .setTimestamp();

banAddLog2.send({ embeds: [banAddEmbed] });
}
});

client27.on('guildBanRemove', async (guild, user) => {
if (logsDB.has(`log_bandelete_${guild.id}`)) {
let banRemoveLog1 = logsDB.get(`log_bandelete_${guild.id}`);
let banRemoveLog2 = guild.channels.cache.get(banRemoveLog1);

const fetchedLogs = await guild.fetchAuditLogs({
  limit: 1,
  type: AuditLogEvent.MemberBanRemove
});

const banRemoveLog = fetchedLogs.entries.first();
const unbanner = banRemoveLog ? banRemoveLog.executor : null;

let banRemoveEmbed = new EmbedBuilder()
  .setColor('#2ecc71')
  .setAuthor({ name: unbanner ? unbanner.tag : 'Unknown', iconURL: unbanner ? unbanner.displayAvatarURL({ dynamic: true }) : guild.iconURL({ dynamic: true }) })
  .setTitle('✅ تم إزالة حظر عضو')
  .addFields(
    { name: '👤 العضو المفكوك الحظر عنه', value: `${user} - \`${user.id}\``, inline: true },
    { name: '🔓 تم فك الحظر بواسطة', value: unbanner ? `${unbanner} - \`${unbanner.id}\`` : '`غير معروف`', inline: true },
    { name: '🕒 وقت فك الحظر', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
  )
  .setThumbnail(user.displayAvatarURL({ dynamic: true }))
  .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) })
  .setTimestamp();

banRemoveLog2.send({ embeds: [banRemoveEmbed] });
}
});

client27.on('guildMemberRemove', async (member) => {
const guild = member.guild;
if (logsDB.has(`log_kickadd_${guild.id}`)) {
const kickLogChannelId = logsDB.get(`log_kickadd_${guild.id}`);
const kickLogChannel = guild.channels.cache.get(kickLogChannelId);

const fetchedLogs = await guild.fetchAuditLogs({
  limit: 1,
  type: AuditLogEvent.MemberKick,
});

const kickLog = fetchedLogs.entries.first();
const kicker = kickLog ? kickLog.executor : null;
const kickReason = kickLog ? kickLog.reason : null;

const kickEmbed = new EmbedBuilder()
  .setColor('#e74c3c')
  .setAuthor({ name: kicker ? kicker.tag : 'Unknown', iconURL: kicker ? kicker.displayAvatarURL({ dynamic: true }) : guild.iconURL({ dynamic: true }) })
  .setTitle('👢 تم طرد عضو')
  .addFields(
    { name: '👤 العضو المطرود', value: `${member.user} - \`${member.user.id}\``, inline: true },
    { name: '👢 تم الطرد بواسطة', value: kicker ? `${kicker} - \`${kicker.id}\`` : '`غير معروف`', inline: true },
    { name: '📝 السبب', value: kickReason ? `\`\`\`${kickReason}\`\`\`` : '`لا يوجد سبب`', inline: false },
    { name: '🕒 وقت الطرد', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
  )
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) })
  .setTimestamp();

kickLogChannel.send({ embeds: [kickEmbed] });
}
});

let invites = {}; 
const getInviteCounts = async (guild) => {
    return new Map(guild.invites.cache.map(invite => [invite.code, invite.uses]));
};

client27.on('inviteCreate', async invite => {
    if (!invites[invite.guild.id]) {
        invites[invite.guild.id] = new Map();
    }
    invites[invite.guild.id].set(invite.code, invite.uses);
});

client27.on('inviteDelete', async invite => {
    if (invites[invite.guild.id]) {
        invites[invite.guild.id].delete(invite.code);
    }
});

client27.on('guildMemberAdd', async member => {
    try {
        const welcomeChannelId = await systemDB.get(`welcome_channel_${member.guild.id}`);
        const welcomeRoleId = await systemDB.get(`welcome_role_${member.guild.id}`);
        const welcomeImage = await systemDB.get(`welcome_image_${member.guild.id}`);

        if (welcomeRoleId) {
            const role = member.guild.roles.cache.get(welcomeRoleId);
            if (role) {
                await member.roles.add(role);
            }
        }

        const newInvites = await member.guild.invites.fetch();
        const oldInvites = invites[member.guild.id] || new Map();

        const usedInvite = newInvites.find(inv => {
            const prevUses = oldInvites.get(inv.code) || 0;
            return inv.uses > prevUses;
        });

        let inviterMention = 'Unknown';
        if (usedInvite && usedInvite.inviter) {
            inviterMention = `<@${usedInvite.inviter.id}>`;
        }

        const fullUser = await client27.users.fetch(member.user.id, { force: true });

        const welcomeEmbed = new EmbedBuilder()
            .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })
            .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })
            .setColor('#787575')
            .setTitle('Welcome to the Server!')
            .setDescription(`Hello ${member}, welcome to **${member.guild.name}**! Enjoy your stay.`)
            .addFields(
                { name: 'Username', value: member.user.tag, inline: true },
                { name: 'Invited By', value: inviterMention, inline: true },
                { name: 'Invite Used', value: usedInvite ? `||${usedInvite.code}||` : 'Direct Join', inline: true },
                { name: 'You\'re Member', value: `${member.guild.memberCount}`, inline: true }
            )
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();
        
        if (welcomeImage) {
            welcomeEmbed.setImage(welcomeImage);
        }

        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
        if (welcomeChannel) {
            await welcomeChannel.send({ embeds: [welcomeEmbed] });
        }

        invites[member.guild.id] = new Map(newInvites.map(invite => [invite.code, invite.uses]));
    } catch (error) {
        console.error('Error handling guildMemberAdd event:', error);
    }
});

client27.on("guildMemberAdd" , async(member) => {
  const theeGuild = member.guild
  let rooms = nadekoDB.get(`rooms_${theeGuild.id}`)
  const message = nadekoDB.get(`message_${theeGuild.id}`)
  if(!rooms) return;
  if(rooms.length <= 0) return;
  if(!message) return;
  await rooms.forEach(async(room) => {
    const theRoom = await theeGuild.channels.cache.find(ch => ch.id == room)
    if(!theRoom) return;
    let finalMessage;
    if (message.includes('{mention}')) {
      finalMessage = message.replace(/{mention}/g, `<@${member.id}>`);
    } else {
      finalMessage = `${message}\n<@${member.id}>`;
    }
    await theRoom.send({content: finalMessage}).then(async(msg) => {
      setTimeout(() => {
        msg.delete();
      }, 3000);
    })
  })
})

  client27.on("interactionCreate" , async(interaction) => {
    
    if(interaction.customId === "help_tax"){
      const embed = new EmbedBuilder()
          .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
          .setTitle('قائمة اوامر البوت')
          .addFields(
            {name : `\`/set-tax-room\`` , value : `لتحديد روم الضريبة التلقائية`},
            {name : `\`/set-tax-line\`` , value : `لتحديد الخط`},
            {name : `\`/tax-mode\`` , value : `لتحديد شكل الضريبة`},
            {name : `\`/tax\` | \`${prefix}tax\`` , value : `لحساب ضريبة بروبوت اي مبلغ تريده`}
          )
          .setTimestamp()
          .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
          .setColor('DarkButNotBlack');
          const btns1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰').setDisabled(true),
            new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
            new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
            new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
            new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
        )

        const btns2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
            new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
            new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
            new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
            new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
        )

        const btns3 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
            new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
            new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
            new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
        )

        await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else 
    
    if(interaction.customId === "help_autoline"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/set-autoline-line\`` , value : `لتحديد الخط`},
        {name : `\`/add-autoline-channel\`` , value : `لاضافة روم خط تلقائي`},
        {name : `\`/remove-autoline-channel\`` , value : `لازالة روم خط تلقائي`},
        {name : `\`/line-mode\`` , value : `تحديد طريقة ارسال الخط`},
        {name : `\`خط\` | \`-\`` , value : `لارسال خط`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖').setDisabled(true),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else 
    
    if(interaction.customId === "help_suggestion"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/set-suggestions-line\`` , value : `لتحديد خط الاقتراحات`},
        {name : `\`/set-suggestions-room\`` , value : `لتحديد روم الاقتراحات`},
        {name : `\`/suggestions-mode\`` , value : `لتحديد شكل الاقتراحات`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡').setDisabled(true),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else 
    
    if(interaction.customId === "help_feedback"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/set-feedback-line\`` , value : `لتحديد خط الاراء`},
        {name : `\`/set-feedback-room\`` , value : `لتحديد روم الاراء`},
        {name : `\`/feedback-mode\`` , value : `امبد أو رياكشن فقط`},
        {name : `\`/setup-rating\`` , value : `لتسطيب نظام تقييم الاداريين`},
        {name : `\`${prefix}تقييم\`` , value : `طلب تقييم`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭').setDisabled(true),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else 
    
    if(interaction.customId === "help_system"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/avatar\`` , value : `لرؤية افتارك او فتار شخص اخر`},
        {name : `\`/server\` | \`${prefix}server\`` , value : `لرؤية معلومات السرفر`},
        {name : `\`/user\`` , value : `لرؤية معلومات حسابك او حساب شخص اخر`},
        {name : `\`/banner\`` , value : `لرؤية بانرك او بانر شخص اخر`},
        {name : `\`/setup-welcome\`` , value : `تسطيب نظام الترحيب`},
        {name : `\`/add-info-button\`` , value : `اضافة زر معلومات`},
        {name : `\`/ban\`` , value : `لاعطاء باند لشخص او ازالته`},
        {name : `\`/clear\` | \`${prefix}clear\`` , value : `لحذف عدد من الرسائل`},
        {name : `\`/come\` | \`${prefix}come\`` , value : `لاستدعاء شخص`},
        {name : `\`/embed\`` , value : `لقول كلام في ايمبد`},
        {name : `\`/hide\` | \`${prefix}hide\`` , value : `لاخفاء روم`},
        {name : `\`/kick\`` , value : `لاعطاء طرد لشخص او ازالته`},
        {name : `\`/lock\` | \`${prefix}lock\`` , value : `لقفل روم`},
        {name : `\`/nickname\`` , value : `اعطاء اسم مستعار لشخص او ازالته`},
        {name : `\`/mute\`` , value : `لاعطاء ميوت لشخص او ازالته`},
        {name : `\`/role\`` , value : `لاعطاء رتبة لشخص او ازالتها`},
        {name : `\`/roles\`` , value : `للاستعلام عن رتب السيرفر`},
        {name : `\`/say\` | \`${prefix}say\`` , value : `لقول كلام`},
        {name : `\`/send\`` , value : `لارسال رسالة لشخص ما`},
        {name : `\`/timeout\`` , value : `لاعطاء تايم اوت لشخص او ازالته`},
        {name : `\`/unhide\` | \`${prefix}unhide\`` , value : `لاظهار روم`},
        {name : `\`/unlock\` | \`${prefix}unlock\`` , value : `لفتح روم`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️').setDisabled(true),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else 
    
    if(interaction.customId === "help_ticket"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/setup-ticket\`` , value : `لانشاء تكت جديد`},
        {name : `\`/add-ticket-button\`` , value : `لاضافة زر للتكت`},
        {name : `\`/to-select\`` , value : `لتحويل التكت الى سلكت منيو`},
        {name : `\`/set-ticket-log\`` , value : `لتحديد رومات اللوغ`},
        {name : `\`/add-user\`` , value : `لاضافة شخص للتكت`},
        {name : `\`/remove-user\`` , value : `لازالة شخص من التكت`},
        {name : `\`/rename\`` , value : `لتغيير اسم التكت`},
        {name : `\`/close\` | \`${prefix}close\`` , value : `لاغلاق التكت`},
        {name : `\`/delete\` | \`${prefix}delete\`` , value : `لحذف التكت`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫').setDisabled(true),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else 
    
    if(interaction.customId === "help_giveaway"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/gstart\`` , value : `لبدا جيف اوي`},
        {name : `\`/gend\`` , value : `لانهاء جيف اوي`},
        {name : `\`/greroll\`` , value : `لاعادة الفائزين في جيف اوي`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁').setDisabled(true),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else 
        
    if(interaction.customId === "help_protection"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/anti-ban\`` , value : `لتسطيب نظام الحماية من الباند`},
        {name : `\`/anti-bots\`` , value : `لتسطيب نظام الحماية من البوتات`},
        {name : `\`/anti-delete-roles\`` , value : `لتسطيب نظام الحماية من حذف الرتب`},
        {name : `\`/anti-delete-rooms\`` , value : `لتسطيب نظام الحماية من حذف الرومات`},
        {name : `\`/protection-status\`` , value : `للاستعلام عن حالة نظام الحماية`},
        {name : `\`/set-protect-logs\`` , value : `لتحديد روم لوج الحماية`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️').setDisabled(true),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else 
            
    if(interaction.customId === "help_logs"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/logs-info\`` , value : `لمعرفة معلومات نظام اللوج في السيرفر`},
        {name : `\`/setup-logs\`` , value : `لتسطيب نظام اللوج في السيرفر`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜').setDisabled(true),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else 
    
    if(interaction.customId === "help_apply"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/setup-apply\`` , value : `لتسطيب نظام التقديم`},
        {name : `\`/new-apply\`` , value : `لانشاء تقديم جديد`},
        {name : `\`/dm-mode\`` , value : `لارسال رسالة لخاص المتقدم عند الرفض او القبول`},
        {name : `\`/close-apply\`` , value : `لانهاء التقديم المفتوح`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝').setDisabled(true),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else 
            
    if(interaction.customId === "help_broadcast"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/send-broadcast-panel\`` , value : `ارسال بانل التحكم في البرودكاست`},
        {name : `\`${prefix}obc\`` , value : `لارسال رسالة للأعضاء الأونلاين`},
        {name : `\`${prefix}bc\`` , value : `ارسال رسالة للكل`},
        {name : `\`/remove-token\`` , value : `ازالة توكن محدد من بوتات البرودكاست`},
        {name : `\`/remove-all-tokens\`` , value : `ازالة جميع توكنات البرودكاست`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢').setDisabled(true),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else 
    
    if(interaction.customId === "help_nadeko"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/set-message\`` , value : `لتحديد الرسالة عند الدخول`},
        {name : `\`/add-nadeko-room\`` , value : `لاضافة روم يتم تفعيل الخاصية فيها`},
        {name : `\`/remove-nadeko-room\`` , value : `لازالة روم مفعل الخاصية فيها`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳').setDisabled(true),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else 
            
    if(interaction.customId === "help_autorole"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/new-panel\`` , value : `انشاء بنل رتب جديد`},
        {name : `\`/add-button\`` , value : `اضافة زر جديد للرتبة`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎'),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡').setDisabled(true),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }else
    
    if(interaction.customId === "help_autoreply"){
      const embed = new EmbedBuilder()
      .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})})
      .setTitle('قائمة اوامر البوت')
      .addFields(
        {name : `\`/autoreply-add\`` , value : `لاضافة رد تلقائي`},
        {name : `\`/autoreply-remove\`` , value : `لازالة رد تلقائي`},
        {name : `\`/autoreply-list\`` , value : `لرؤية جميع الردود`},
      )
      .setTimestamp()
      .setFooter({text : `Requested By ${interaction.user.username}` , iconURL : interaction.user.displayAvatarURL({dynamic : true})})
      .setColor('DarkButNotBlack');
      const btns1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_tax').setLabel('ضريبة').setStyle(ButtonStyle.Secondary).setEmoji('💰'),
        new ButtonBuilder().setCustomId('help_autoline').setLabel('خط تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('🤖'),
        new ButtonBuilder().setCustomId('help_suggestion').setLabel('اقتراحات').setStyle(ButtonStyle.Secondary).setEmoji('💡'),
        new ButtonBuilder().setCustomId('help_feedback').setLabel('اراء').setStyle(ButtonStyle.Secondary).setEmoji('💭'),
        new ButtonBuilder().setCustomId('help_system').setLabel('سيستم').setStyle(ButtonStyle.Secondary).setEmoji('⚙️'),
    )

    const btns2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_ticket').setLabel('تكت').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        new ButtonBuilder().setCustomId('help_giveaway').setLabel('جيف اوي').setStyle(ButtonStyle.Secondary).setEmoji('🎁'),
        new ButtonBuilder().setCustomId('help_protection').setLabel('حماية').setStyle(ButtonStyle.Secondary).setEmoji('🛡️'),
        new ButtonBuilder().setCustomId('help_logs').setLabel('لوج').setStyle(ButtonStyle.Secondary).setEmoji('📜'),
        new ButtonBuilder().setCustomId('help_apply').setLabel('تقديمات').setStyle(ButtonStyle.Secondary).setEmoji('📝'),
    )

    const btns3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_broadcast').setLabel('برودكاست').setStyle(ButtonStyle.Secondary).setEmoji('📢'),
        new ButtonBuilder().setCustomId('help_nadeko').setLabel('ناديكو').setStyle(ButtonStyle.Secondary).setEmoji('⏳'),
        new ButtonBuilder().setCustomId('help_autoreply').setLabel('رد تلقائي').setStyle(ButtonStyle.Secondary).setEmoji('💎').setDisabled(true),
        new ButtonBuilder().setCustomId('help_autorole').setLabel('رتب تلقائية').setStyle(ButtonStyle.Secondary).setEmoji('⚡'),
    )

    await interaction.update({embeds : [embed] , components : [btns1 , btns2 , btns3]});
    }
  })

const autoReactionDB = new Database("/Json-db/Bots/autoReactionDB.json");

client27.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  
  const autoReactionData = autoReactionDB.get(`auto_reaction_room_${message.channel.id}`);
  if (autoReactionData && autoReactionData.emojis && autoReactionData.emojis.length > 0) {
    try {
      for (const emoji of autoReactionData.emojis) {
        await message.react(emoji).catch(() => {});
      }
    } catch (error) {
      console.error('Auto reaction error:', error);
    }
  }
});

client27.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  const ticketPrefix = shortcutDB.get(`ticket_prefix_${message?.guild?.id}`) || '-';
  const renameCmd = shortcutDB.get(`rename_ticket_cmd_${message?.guild?.id}`) || 'اسم';
  const addCmd = shortcutDB.get(`add_ticket_cmd_${message?.guild?.id}`) || 'اضف';
  const removeCmd = shortcutDB.get(`remove_ticket_cmd_${message?.guild?.id}`) || 'ازالة';
  const closeCmd = shortcutDB.get(`close_ticket_cmd_${message?.guild?.id}`) || 'غلق';
  const deleteCmd = shortcutDB.get(`delete_ticket_cmd_${message?.guild?.id}`) || 'حذف';
  const pointsCmd = shortcutDB.get(`points_ticket_cmd_${message?.guild?.id}`) || 'نقاط';

  const ticketData = ticketDB.get(`TICKET-PANEL_${message.channel.id}`);

  const supportRoleID = ticketData?.Support;
  
  if (message.content.startsWith(`${ticketPrefix}${renameCmd}`)) {
    if (!ticketData) return;
    if (!message.member.roles.cache.has(supportRoleID)) {
      return message.reply({ content: ':x: Only Support' });
    }
    
    const newName = message.content.slice(`${ticketPrefix}${renameCmd}`.length).trim();
    if (!newName) {
      return message.reply({ content: 'من فضلك اكتب اسم جديد للتكت' });
    }
    
    try {
      await message.channel.setName(newName);
      return message.reply({ content: `تم تغيير اسم التكت إلى: ${newName}` });
    } catch (error) {
      return message.reply({ content: 'حدث خطأ أثناء تغيير الاسم' });
    }
  }
  
  if (message.content.startsWith(`${ticketPrefix}${addCmd}`)) {
    if (!ticketData) return;
    if (!message.member.roles.cache.has(supportRoleID)) {
      return message.reply({ content: ':x: Only Support' });
    }
    
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply({ content: 'من فضلك قم بعمل منشن للعضو' });
    }
    
    try {
      await message.channel.permissionOverwrites.edit(member.id, { ViewChannel: true, SendMessages: true });
      return message.reply({ content: `تم اضافة ${member} للتذكرة` });
    } catch (error) {
      return message.reply({ content: 'حدث خطأ أثناء الإضافة' });
    }
  }
  
  if (message.content.startsWith(`${ticketPrefix}${removeCmd}`)) {
    if (!ticketData) return;
    if (!message.member.roles.cache.has(supportRoleID)) {
      return message.reply({ content: ':x: Only Support' });
    }
    
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply({ content: 'من فضلك قم بعمل منشن للعضو' });
    }
    
    try {
      await message.channel.permissionOverwrites.edit(member.id, { ViewChannel: false });
      return message.reply({ content: `تم ازالة ${member} من التذكرة` });
    } catch (error) {
      return message.reply({ content: 'حدث خطأ أثناء الإزالة' });
    }
  }
  
  if (message.content === `${ticketPrefix}${closeCmd}`) {
    if (!ticketData) return;
    if (!message.member.roles.cache.has(supportRoleID)) {
      return message.reply({ content: ':x: Only Support' });
    }
    
    await message.channel.permissionOverwrites.edit(ticketData.author, { ViewChannel: false });
    
    const embed2 = new EmbedBuilder()
      .setDescription(`تم اغلاق تذكرة بواسطة ${message.author}`)
      .setColor("Yellow");
    
    const embed = new EmbedBuilder()
      .setDescription("```لوحة فريق الدعم.```")
      .setColor("DarkButNotBlack");
    
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder().setCustomId('delete').setLabel('Delete').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId('Open').setLabel('Open').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('Tran').setLabel('Transcript').setStyle(ButtonStyle.Secondary)
      );
    
    await message.reply({ embeds: [embed2, embed], components: [row] });
    
    const logsRoomId = ticketDB.get(`LogsRoom_${message?.guild?.id}`);
    const logChannel = message.guild.channels.cache.get(logsRoomId);
    
    if (logChannel) {
      const logEmbed = new EmbedBuilder()
        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
        .setTitle('Close Ticket')
        .addFields(
          { name: 'Name Ticket', value: `${message.channel.name}` },
          { name: 'Owner Ticket', value: `${ticketData.author}` },
          { name: 'Closed By', value: `${message.author}` },
        )
        .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
      
      logChannel.send({ embeds: [logEmbed] });
    }
    return;
  }
  
  if (message.content === `${ticketPrefix}${deleteCmd}`) {
    if (!ticketData) return;
    if (!message.member.roles.cache.has(supportRoleID)) {
      return message.reply({ content: ':x: Only Support' });
    }
    
    const embed = new EmbedBuilder()
      .setColor('Red')
      .setDescription('Ticket will be deleted in a few seconds');
    
    await message.reply({ embeds: [embed] });
    
    const Logs = ticketDB.get(`LogsRoom_${message?.guild?.id}`);
    const Log = message.guild.channels.cache.get(Logs);
    
    try {
      const attachment = await discordTranscripts.createTranscript(message.channel);
      const embedTrans = new EmbedBuilder()
        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
        .setTitle('Auto Transcript - Deleted Ticket')
        .setFields(
          { name: `Name Ticket`, value: `${message.channel.name}` },
          { name: `Owner Ticket`, value: `${ticketData.author}` },
          { name: `Deleted BY`, value: `${message.author}` },
        )
        .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
      
      Log?.send({ embeds: [embedTrans], files: [attachment] });
    } catch (error) {
      console.error('Error creating auto transcript:', error);
    }
    
    setTimeout(() => {
      message.channel.delete();
    }, 5000);
    
    ticketDB.delete(`TICKET-PANEL_${message.channel.id}`);
    return;
  }
  
  if (message.content.startsWith(`${ticketPrefix}${pointsCmd}`)) {
    try {
      const mentionedUser = message.mentions.users.first();
      const targetUser = mentionedUser || message.author;
      const userPoints = ticketDB.get(`ticket_points_${message?.guild?.id}_${targetUser.id}`) || 0;
      
      const embed = new EmbedBuilder()
        .setTitle('نقاط التكتات')
        .setDescription(`${targetUser} لديه **${userPoints}** نقطة`)
        .setColor('Blue')
        .setThumbnail(targetUser.displayAvatarURL());
      
      return message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error in points command:', error);
      return message.reply({ content: 'حدث خطأ أثناء عرض النقاط' }).catch(() => {});
    }
  }
  
  if (message.content.startsWith(`${ticketPrefix}تصفير`)) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply({ content: '❗ ***يجب أن تمتلك صلاحية الأدمن لاستخدام هذا الأمر***' });
    }
    
    const mentionedUser = message.mentions.users.first();
    if (!mentionedUser) {
      return message.reply({ content: 'من فضلك قم بعمل منشن للعضو الذي تريد تصفير نقاطه' });
    }
    
    try {
      ticketDB.set(`ticket_points_${message?.guild?.id}_${mentionedUser.id}`, 0);
      
      const embed = new EmbedBuilder()
        .setTitle('تصفير النقاط')
        .setDescription(`تم تصفير نقاط ${mentionedUser} بنجاح`)
        .setColor('Green')
        .setThumbnail(mentionedUser.displayAvatarURL());
      
      return message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error in reset points command:', error);
      return message.reply({ content: 'حدث خطأ أثناء تصفير النقاط' }).catch(() => {});
    }
  }
  
  if (message.content.startsWith(`${ticketPrefix}توب`)) {
    
    return;
  }
});

const mcDB = new Database('/Json-db/Others/mcDB.json');

client27.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return;
    const content = message.content.toLowerCase();
    if (content === 'ip' || content === 'mc') {
        const config = mcDB.get(`mc_config_${message?.guild?.id}`);
        if (!config) return;

        try {
            const embed = new EmbedBuilder()
                .setTitle(`⚡ ${message.guild.name} ⚡`)
                .setColor('Green')
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .addFields(
                    { name: 'Network:', value: `🔹 **IP ->** \`${config.javaip}\`\n🔹 **PORT ->** \`${config.bedrockport}\`` },
                    { name: 'Info:', value: `🌐 **Status ->** Fetching...\n📶 **Ping ->** N/A\n👥 **Players ->** N/A` },
                    { name: 'Other:', value: `📌 **Version ->** ${config.mcversion}` }
                )
                .setImage(`https://api.mcstatus.io/v2/status/java/${config.javaip}:${config.javaport}`);

            const row = new ActionRowBuilder();
            if (config.javaimage) {
                row.addComponents(new ButtonBuilder().setCustomId('mc_how_java').setLabel('طريقة الدخول للجافا').setStyle(ButtonStyle.Primary));
            }
            if (config.bedrockimage) {
                row.addComponents(new ButtonBuilder().setCustomId('mc_how_bedrock').setLabel('طريقة الدخول للبيدروك').setStyle(ButtonStyle.Primary));
            }

            message.reply({ embeds: [embed], components: row.components.length > 0 ? [row] : [] });
        } catch (error) {
            console.error(error);
        }
    }
});

client27.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    const config = mcDB.get(`mc_config_${interaction.guild.id}`);
    if (!config) return;

    if (interaction.customId === 'mc_how_java') {
        const embed = new EmbedBuilder()
            .setTitle('🎮 طريقة الدخول للجافا')
            .setDescription(`الآيبي: \`${config.javaip}\`\nالإصدار: \`${config.mcversion}\``)
            .setImage(config.javaimage)
            .setColor('Blue');
        await interaction.reply({ embeds: [embed], ephemeral: true });
    } else if (interaction.customId === 'mc_how_bedrock') {
        const embed = new EmbedBuilder()
            .setTitle('📱 طريقة الدخول للبيدروك')
            .setDescription(`الآيبي: \`${config.bedrockip}\`\nالبورت: \`${config.bedrockport}\`\nالإصدار: \`${config.mcversion}\``)
            .setImage(config.bedrockimage)
            .setColor('Green');
        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
});

setInterval(async () => {
    for (const guild of client27.guilds.cache.values()) {
        const channelId = mcDB.get(`live_status_channel_${guild.id}`);
        const msgId = mcDB.get(`live_status_msg_${guild.id}`);
        const config = mcDB.get(`mc_config_${guild.id}`);
        
        if (channelId && msgId && config) {
            try {
                const channel = await guild.channels.fetch(channelId).catch(() => null);
                if (!channel) continue;
                const msg = await channel.messages.fetch(msgId).catch(() => null);
                if (!msg) continue;

                const embed = new EmbedBuilder()
                    .setTitle(`📊 Live Status: ${guild.name}`)
                    .setColor('Green')
                    .addFields(
                        { name: 'Status:', value: '🟢 Checking...', inline: true },
                        { name: 'Players:', value: '0/0', inline: true },
                        { name: 'Version:', value: config.mcversion, inline: true }
                    )
                    .setImage(`https://api.mcstatus.io/v2/status/java/${config.javaip}:${config.javaport}?t=${Date.now()}`)
                    .setTimestamp();

                await msg.edit({ embeds: [embed] });
            } catch (error) {
                console.error('Update Live Status Error:', error);
            }
        }
    }
}, 5 * 60 * 1000);

const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running');
}).listen(5000, '0.0.0.0', () => {
    console.log('Health check server running on port 5000');
});

client27.login(token);

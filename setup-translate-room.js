/*
 * Eyad's system
 * Property of Eyad
 */
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { Database } = require('st.db');
const translateDB = new Database('/Json-db/Bots/translateDB.json');

module.exports = {
    adminsOnly: true,
    data: new SlashCommandBuilder()
        .setName('setup-translate-room')
        .setDescription('تحديد غرفة الإعلانات المترجمة تلقائياً')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('القناة')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('enabled')
                .setDescription('تشغيل أو إيقاف الميزة')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const enabled = interaction.options.getBoolean('enabled');
        
        await translateDB.set(`translate_room_${interaction.guild.id}`, { channelId: channel.id, enabled: enabled });
        
        const embed = new EmbedBuilder()
            .setTitle('✅ تم الإعداد بنجاح')
            .setDescription(`تم تحديد القناة <#${channel.id}> كقناة إعلانات مترجمة تلقائياً.\nالحالة: **${enabled ? 'شغال' : 'متوقف'}**`)
            .setColor(enabled ? 'Green' : 'Red')
            .setTimestamp();
            
        return interaction.reply({ embeds: [embed] });
    }
};

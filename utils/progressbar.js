module.exports = {
    progressbar: function (total, current, size, emp, line, slider) {
      const player = client.manager.players.get(message.guild.id)
      if (!player.queue.current) return slider + line.repeat(size - 1)
      else if (current > total) {
            const bar = line.repeat(size + 2);
            return bar;
        } else {
            const percentage = current / total;
            const progress = Math.round((size * percentage));
            const emptyProgress = size - progress;
            const progressText = emp.repeat(progress).replace(/.$/, `>`+slider);
            const emptyProgressText = line.repeat(emptyProgress);
            const bar = progressText + emptyProgressText;
            return bar;
        }
    }

} 
function links(parent, args, context) {
    return context.prisma.user_.findUnique({ where: { id: parent.id } }).links()
  }
  
  module.exports = {
    links,
  }